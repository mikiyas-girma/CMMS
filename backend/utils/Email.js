import nodemailer from "nodemailer";
// import nodemailerSendgrid from "nodemailer-sendgrid";
import { htmlToText } from "html-to-text";

export class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.Fname;
    this.url = url;
    this.from = `CMMS <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // SendGrid

      return nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 587,
        auth: {
          user: "apikey",
          pass: process.env.SENDGRID_API_KEY,
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
    const text = htmlToText(html);

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text,
    };

    // Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome(pass) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
          }
          .header {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            color: #333333;
          }
          .content {
            margin-top: 20px;
            line-height: 1.6;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            color: #ffffff;
            background-color: #777777;
            text-decoration: none;
            border-radius: 5px;
          }
  
          .footer {
            margin-top: 20px;
            text-align: center;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            Welcome to CMMS, ${this.firstName}!
          </div>
          <div class="content">
            <p>Dear ${this.firstName},</p>
            <p>We're excited to have you on board. Your account has been registered  as a storekeeper of a store.</p>
            <p>Your password is: <strong>${pass}</strong></p>
            <p>You can log in to the system by clicking the link below:</p>
            <p><a href="${this.url}" class="button">Login to CMMS</a></p>
            <p>After you have logged into the system, please change your password to ensure your account's security.</p>
          </div>
          <div class="footer">
            <p>Best regards,</p>
            <p>Jibril Arbicho,
            Store Owner of CMMS</p>
          </div>
        </div>
      </body>
      </html>
    `;
    await this.send("Welcome to CMMS!", html);
  }
  async sendPasswordReset() {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
          }
          .header {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            color: #333333;
          }
          .content {
            margin-top: 20px;
            line-height: 1.6;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            color: #ffffff;
            background-color: #007BFF;
            text-decoration: none;
            border-radius: 5px;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            Password Reset Request
          </div>
          <div class="content">
            <p>Dear ${this.firstName},</p>
            <p>We received a request to reset your password for your CMMS account.</p>
            <p>Please click the link below to reset your password. This link is valid for only  10 minutes.</p>
            <p><a href="${this.url}" class="button">Reset Password</a></p>
            <p>If you did not request a password reset, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>Thank you,</p>
            <p>The CMMS Team</p>
          </div>
        </div>
      </body>
      </html>
    `;
    await this.send("CMMS, Reset Forgotten Password", html);
  }
}
