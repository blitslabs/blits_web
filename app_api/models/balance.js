module.exports = (sequelize, DataTypes) => {
    return sequelize.define('balance', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'MXN'
        },        
        available: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            defaultValue: 0
        },
        locked: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            defaultValue: 0
        }
    })
}