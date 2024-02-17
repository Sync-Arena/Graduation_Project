import nodemailer from "nodemailer";

export const sendEmail = async function (options) {
  // create a transporter
  const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
      user: process.env.SEND_GRID_USERNAME,
      pass: process.env.SEND_GRID_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: "ibrahimkaldesh1@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};
