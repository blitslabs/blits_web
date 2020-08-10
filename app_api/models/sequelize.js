const Sequelize = require('sequelize')
const SepomexModel = require('./sepomex')
const PreCreditRequestModel = require('./preCreditRequest')

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
    sequelize,
}