const nodemailer = require('nodemailer')
const { AdminSettings } = require('../app_api/models/sequelize')

module.exports.sendEmail = async function send(toEmail, subject, nip) {
    const adminSettings = await AdminSettings.findOne({ where: { id: 1 } })

    const transporter = nodemailer.createTransport({
        host: adminSettingsSMTP_HOST,
        port: adminSettings.SMTP_PORT,
        secure: false,
        use_authentication: true,
        auth: {
            user: adminSettings.SMTP_USER,
            pass: adminSettings.SMTP_PORT
        }
    })

    let response

    try {
        response = await transporter.sendMail({
            from: `"Sway Lending" <${adminSettings.SMTP_USER}>`,
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