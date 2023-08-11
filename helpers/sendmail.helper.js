const nodemailer = require("nodemailer");

const sendEmail = (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fiqrimilano@gmail.com",
      pass: "azuksxsxwiambotf",
    },
  });

  const mailOptions = {
    from: "fiqrimilano@gmail.com",
    to: email,
    subject: subject,
    html: html,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });
};

module.exports = { sendEmail };
