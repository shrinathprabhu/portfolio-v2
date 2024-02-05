import isEmail from "validator/lib/isEmail";
import mongoose, { Schema } from "mongoose";
import { DirectMessage } from "~/utils/DirectMessage";

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
  const { dbConnUri } = useRuntimeConfig(event);
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

  const conn = await mongoose.connect(dbConnUri);
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
  await conn.disconnect();
  return new Response(
    JSON.stringify({
      msg: "Message submitted successfully. You will receive a response soon.",
      code: "SUCCESS",
    }),
    { status: 200 }
  );
});
