import nodemailer from "nodemailer";
import { fromString as htmlToTextFromString } from "html-to-text";

export class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `CMMS <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // SendGrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject, html) {
    // Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToTextFromString(html),
    };

    // Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
<<<<<<< HEAD
        <title>Welcome to the Natours Family</title>
      </head>
      <body>
        <h1>Welcome to the Natours Family, ${this.firstName}!</h1>
=======
        <title>Welcome to CMMS</title>
      </head>
      <body>
        <h1>Welcome to CMMS, ${this.firstName}!</h1>
>>>>>>> 0ad6df8 (sendWlecome method in Email class)
        <p>We're excited to have you on board. Please click the link below to confirm your email address:</p>
        <a href="${this.url}">Confirm your email</a>
      </body>
      </html>
    `;
<<<<<<< HEAD
    await this.send("Welcome to the Natours Family!", html);
=======
    await this.send("Welcome to CMMS!", html);
>>>>>>> 0ad6df8 (sendWlecome method in Email class)
  }
}
