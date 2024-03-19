import nodemailer from "nodemailer";

class SendEmail {
  #password;
  constructor(user, password, service, options) {
    this.user = user;
    this.#password = password;
    this.service = service;
    this.options = options;
  }

  // create a transporter
  createEmailTransport() {
    return nodemailer.createTransport({
      service: this.service,
      auth: {
        user: this.user,
        pass: this.#password,
      },
    });
  }

  // 2) Define the email options
  defineMailOptions() {
    return {
      from: "ibrahimkaldesh1@gmail.com",
      to: this.options.email,
      subject: this.options.subject,
      text: this.options.message,
    };
  }

  // 3) Actually send the email
  async sendActualEmail() {
    const transport = this.createEmailTransport();
    await transport.sendMail(this.defineMailOptions());
  }
}

export default SendEmail;
