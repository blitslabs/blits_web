const nodemailer = require('nodemailer')

module.exports.sendEmail = async function send(toEmail, subject, nip) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        use_authentication: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PORT
        }
    })

    let response

    try {
        response = await transporter.sendMail({
            from: `"Sway Lending" <${process.env.SMTP_USER}>`,
            to: toEmail,
            subject: subject,
            text: 'Hello World',
            html: "<h1>Hello World</h1>",
        })
        return response
    } catch (e) {
        console.log(e)
        return false
    }

}