const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    console.log(subject);
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            service: process.env.SMTP_SERVICE,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: "Hoa",
                pass: process.env.SMTP_PASSWORD,
            },
        });
        
        await transporter.sendMail({
            from: "hoa",
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;