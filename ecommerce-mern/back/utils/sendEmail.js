const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    // Pede email e senha do usuario
    const transporter = nodeMailer.createTransport({
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    await transporter.sendEmail(mailOptions);
};

module.exports = sendEmail;