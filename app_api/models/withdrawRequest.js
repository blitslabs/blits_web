module.exports = (sequelize, DataTypes) => {
    return sequelize.define('withdrawRequest', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        accountId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        amount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            defaultValue: 0
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'MXN'
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },        
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'PENDING'
        },
    })
}