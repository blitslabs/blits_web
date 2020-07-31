module.exports = (sequelize, DataTypes) => {
    return sequelize.define('paymentSettings', {
        dailyTarget: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 0
        },
        taxPercentage: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            defaultValue: 0
        },
        surgeTriggerPoint: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            defaultValue: 0
        },
        surgePercentage: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            defaultValue: 0
        },
        comissionPercentage: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            defaultValue: 0
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'MXN'
        },
        bookingIdPrefix: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'MX'
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ACTIVE'
        }
    })
}