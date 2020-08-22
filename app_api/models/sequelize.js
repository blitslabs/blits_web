const Sequelize = require('sequelize')
const NewsletterLeadModel = require('./newsletterLead')
const LoanModel = require('./loan')

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

const NewsletterLead = NewsletterLeadModel(sequelize, Sequelize)
const Loan = LoanModel(sequelize, Sequelize)

sequelize
    .query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
    .then(() => {
        sequelize.sync({ force: false })
            .then(() => {
                console.log('Database & tables created')
            })
    })

module.exports = {
    NewsletterLead,
    Loan,
    sequelize,
}