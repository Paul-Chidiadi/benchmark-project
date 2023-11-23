const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const { convert } = require('html-to-text');

dotenv.config({ path: '.env' });
class SendGridService {
  emailFrom = process.env.EMAIL_FROM;
  baseUrl = process.env.BASE_URL;
  GMAIL_HOST = process.env.GMAIL_HOST;
  GMAIL_USERNAME = process.env.GMAIL_USERNAME;
  GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
  SERVICE_NAME = process.env.SERVICE_NAME;
  GMAIL_PORT = process.env.GMAIL_PORT;

  constructor(emailFrom, baseUrl, GMAIL_HOST, GMAIL_USERNAME, GMAIL_PASSWORD, SERVICE_NAME, GMAIL_PORT) {
    emailFrom = this.emailFrom;
    baseUrl = this.baseUrl;
    GMAIL_HOST = this.GMAIL_HOST;
    GMAIL_USERNAME = this.GMAIL_USERNAME;
    GMAIL_PASSWORD = this.GMAIL_PASSWORD;
    SERVICE_NAME = this.SERVICE_NAME;
    GMAIL_PORT = this.GMAIL_PORT;
  }

  async sendMail(options, template) {
    const text = convert(template, {
      wordwrap: 130,
    });
    const msg = {
      to: options.email,
      from: this.emailFrom, // Use the email address or domain you verified above
      subject: options.subject,
      text,
      html: template,
    };
    const transporter = nodemailer.createTransport({
      service: this.SERVICE_NAME,
      host: this.GMAIL_HOST,
      port: Number(this.GMAIL_PORT),
      auth: {
        user: this.GMAIL_USERNAME,
        pass: this.GMAIL_PASSWORD,
      },
    });
    // send the email with nodemailer
    await transporter.sendMail(msg);
  }

  async sendOTP(options) {
    if (options.otp !== undefined && options.otp.toString().length === 6) {
      const message = `<p>Hello ${options.first_name},</p>
      <p>Welcome to Ubefu. Please verify your 
      email address with the OTP code below. It would expire after 10mins.<p>
      <p>OTP: <b>${options.otp}</b></p>
      <p>Team Ubefu</p>`;
      await this.sendMail(options, message);
    }
  }
}

module.exports = SendGridService;
