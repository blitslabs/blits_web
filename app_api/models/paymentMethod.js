module.exports = (sequelize, DataTypes) => {
    return sequelize.define('paymentMethod', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        publicKey: {
            type: DataTypes.STRING,
            allowNull: true
        },
        secretKey: {
            type: DataTypes.STRING,
            allowNull: true,
            
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ACTIVE'
        }
    })
}