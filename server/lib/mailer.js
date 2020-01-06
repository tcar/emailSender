"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports = async function main(to, joke) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();
  const user = process.env.USER || testAccount.user;
  const pass = process.env.PASS || testAccount.pass;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.HOST || "smtp.ethereal.email",
    port: process.env.PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user, // generated ethereal user
      pass // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: user, // sender address
    to, // list of receivers
    subject: "Chuck Noris joke", // Subject line
    text: joke, // plain text body
    html: `<b>${joke}</b>` // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
