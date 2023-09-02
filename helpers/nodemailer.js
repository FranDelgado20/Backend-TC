const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: "delgadofran78@gmail.com",
      pass: "luoznzyspntycfjb",
    },
  });

  module.exports= transporter