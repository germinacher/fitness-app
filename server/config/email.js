const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail', // o 'outlook', 'yahoo', etc.
    auth: {
      user: process.env.EMAIL_USER, // tu email
      pass: process.env.EMAIL_PASS  // contraseña de aplicación
    }
});

module.exports = transporter;