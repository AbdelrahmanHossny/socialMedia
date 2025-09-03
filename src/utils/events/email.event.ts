import { EventEmitter } from "node:events";
import Mail from "nodemailer/lib/mailer";
import { sendEmail } from "../mail/send.email";
import { verifyEmailTemplate } from "../mail/templets/verify.templates";

export const emailEvent = new EventEmitter();
  interface Iemail extends Mail.Options {
    otp :number
  }
emailEvent.on("confirmEmail", async (data: Iemail) => {

  try {
    data.subject = "Confirm-Email";
    data.html = verifyEmailTemplate({ otp: data.otp });
    await sendEmail(data);
  } catch (error) {
    console.log("Fail to send email", error);
  }
});
