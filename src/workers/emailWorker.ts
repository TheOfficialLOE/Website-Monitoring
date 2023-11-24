import { emailQueue } from "../index";
import nodemailer from "nodemailer";
import { ServerKeys } from "../ServerKeys";

const transporter = nodemailer.createTransport({
  host: ServerKeys.SMTP_HOST,
  port: ServerKeys.SMTP_PORT,
  auth: {
    user: ServerKeys.SMTP_AUTH_USER,
    pass: ServerKeys.SMTP_AUTH_PASS
  }
});

(async () => {
  await emailQueue.process(async ({ data: { email, url }}) => {
    // in the real world we should check for the last time an email was sent,
    // we don't want to send an email whenever the website is down
    await transporter.sendMail({
      from: ServerKeys.MAIL_FROM,
      to: email,
      subject: "down",
      html: "your website is down"
    });
  })
})();