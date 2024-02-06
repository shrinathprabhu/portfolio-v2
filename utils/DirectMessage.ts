export const DirectMessage = {
  presets: [
    "Hello there 👋! Nice to meet you 🤝, may I know your email address 💌?",
    "Perfect 👍! Drop me a message 💬 and I'll get back to you as soon as possible.",
    "I received your message 🥳. You'll receive a reply via mail as soon as possible ⏳. Thank you for your patience 🫡!",
  ],
  errorCodes: {
    INVALID_INPUT: "INVALID_INPUT",
    ALREADY_REPLIED: "ALREADY_REPLIED",
    ALREADY_SUBMITTED: "ALREADY_SUBMITTED",
  },
  errorMessages: {
    INVALID_INPUT:
      "Uh Oh! That something looks incorrect 🙄😒. Please enter a correct details.",
    ALREADY_REPLIED: "Check your mailbox, you've already received a reply 💌!",
    ALREADY_SUBMITTED:
      "Message already submitted 🤠. You will receive a reply via mail soon 💌. Thank you for reaching out 🫡!",
    GENERIC_ERROR: "Something went wrong 😔. Please try again.",
    INVALID_EMAIL:
      "Uh Oh! That email address looks incorrect 🙄😒. Please enter a correct email address 💌.",
  },
  welcomeBack: (email: string) =>
    `Welcome back ${email} 🤗! Drop me a message 💬 and I'll get back to you as soon as possible.`,
};
