module.exports = (sequelize, DataTypes) => {
    return sequelize.define('adminSettings', {
        SMTP_HOST: {
            type: DataTypes.STRING,
            allowNull: true
        },
        SMTP_PORT: {
            type: DataTypes.STRING,
            allowNull: true
        },
        SMTP_USER: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        SMTP_PASS: {
            type: DataTypes.STRING,
            allowNull: true
        },
        SMS_API_KEY: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        SMS_API_SECRET: {
            type: DataTypes.STRING,
            allowNull: true
        },
        CIRCULO_CREDITO_API_KEY: {
            type: DataTypes.STRING,
            allowNull: true
        },        
        CIRUCLO_CREDITO_USER: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        NUMERO_OTORGANTE: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        WHATSAPP_API_KEY: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        WHATSAPP_PHONE_NUMBER: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        GOOGLE_CLIENT_EMAIL: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        GOOGLE_SPREADSHEET_ID: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        GOOGLE_SHEET_ID: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    })
}