module.exports = (sequelize, DataTypes) => {
    return sequelize.define('account', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        accountName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        paypalId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bankName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        accountNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        routingNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        accountType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'MXN'
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'MXN'
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'PENDING'
        },
    })
}