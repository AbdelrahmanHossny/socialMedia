import nodemailer from "nodemailer";

export const sendEmail = async ({
  from = process.env.App_Email,
  to = "",
  subject = "sara7a",
  text = "",
  html = "",
  attachments = [],
} = {}) => {
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    service: "gmail", // true for 465, false for other ports
    auth: {
      user: process.env.App_Email,
      pass: process.env.APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: `"Sara7a" <${from}>`, // sender address
    to,
    text,
    subject,
    html,
    attachments,
  });

  console.log("Message sent: %s", info.messageId);
};
