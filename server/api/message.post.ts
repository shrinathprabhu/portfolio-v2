import isEmail from "validator/lib/isEmail";
import mongoose, { Schema } from "mongoose";
import { DirectMessage } from "~/utils/DirectMessage";
import nodemailer from "nodemailer";

const MessageSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
  },
  replied: {
    type: Boolean,
    default: false,
  },
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { message, email } = await readBody(event);
  if (!message || !email || !isEmail(email)) {
    return new Response(
      JSON.stringify({
        msg: "Invalid email or message provided. Please try again.",
        code: DirectMessage.errorCodes.INVALID_INPUT,
      }),
      { status: 400 }
    );
  }

  const conn = await mongoose.connect(config.dbConnUri);
  const MessageModel = conn.model("Messages", MessageSchema);
  const existingEntry = await MessageModel.findOne({ email }).exec();
  if (existingEntry) {
    await conn.disconnect();
    if (existingEntry.replied) {
      return new Response(
        JSON.stringify({
          msg: "You have already received a response for your message.",
          code: DirectMessage.errorCodes.ALREADY_REPLIED,
        }),
        { status: 400 }
      );
    }
    return new Response(
      JSON.stringify({
        msg: "You have already submitted a message. Please wait for a response.",
        code: DirectMessage.errorCodes.ALREADY_SUBMITTED,
      }),
      { status: 400 }
    );
  }
  await new MessageModel({ email, message }).save();
  const mailer = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort),
    secure: true,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });
  mailer
    .sendMail({
      from: config.smtpUser,
      to: email,
      subject: "Your message has been received @ shrinath.me",
      text: `
    Thank you for reaching out to me. This is an automated message to confirm that I have received your recent communication. I will respond as soon as possible.

    If you have any urgent concerns or require immediate assistance, please don't hesitate to contact us directly at ${config.smtpUser}.Thank you for your patience and understanding.

    Here's the copy of your message:
    "${message}"

    Best Regards,
    Shrinath Prabhu @ shrinath.me
    `,
    })
    .then((info: any) => console.log("Mail sent", info.messageId))
    .catch((err: unknown) => console.error(err));
  await conn.disconnect();
  return new Response(
    JSON.stringify({
      msg: "Message submitted successfully. You will receive a response soon.",
      code: "SUCCESS",
    }),
    { status: 200 }
  );
});
