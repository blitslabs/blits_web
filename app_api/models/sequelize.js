const Sequelize = require('sequelize')
const SepomexModel = require('./sepomex')
const PreCreditRequestModel = require('./preCreditRequest')
const CreditReportModel = require('./creditReport')
const CreditReportConsultaModel = require('./creditReportConsulta')
const CreditReportCreditoModel = require('./creditReportCredito')
const CreditReportDomicilioModel = require('./creditReportDomicilio')
const CreditReportEmpleoModel = require('./creditReportEmpleo')
const CreditReportMensajeModel = require('./creditReportMensaje')
const CreditReportScoreModel = require('./creditReportScore')
const AdminSettingsModel = require('./adminSettings')
const UserModel = require('./user')

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
)


const Sepomex = SepomexModel(sequelize, Sequelize)
const PreCreditRequest = PreCreditRequestModel(sequelize, Sequelize)
const CreditReport = CreditReportModel(sequelize, Sequelize)
const CreditReportConsulta = CreditReportConsultaModel(sequelize, Sequelize)
const CreditReportCredito = CreditReportCreditoModel(sequelize, Sequelize)
const CreditReportDomicilio = CreditReportDomicilioModel(sequelize, Sequelize)
const CreditReportEmpleo = CreditReportEmpleoModel(sequelize, Sequelize)
const CreditReportMensaje = CreditReportMensajeModel(sequelize, Sequelize)
const CreditReportScore = CreditReportScoreModel(sequelize, Sequelize)
const AdminSettings = AdminSettingsModel(sequelize, Sequelize)
const User = UserModel(sequelize, Sequelize)

sequelize
    .query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
    .then(() => {
        sequelize.sync({ force: false })
            .then(() => {
                console.log('Database & tables created')
            })
    })

module.exports = {
    Sepomex,
    PreCreditRequest,
    CreditReport,
    CreditReportConsulta,
    CreditReportCredito,
    CreditReportDomicilio,
    CreditReportEmpleo,
    CreditReportMensaje,
    CreditReportScore,
    AdminSettings,
    User,
    sequelize,
}