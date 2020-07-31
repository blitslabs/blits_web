module.exports = (sequelize,DataTypes) => {
    return sequelize.define('promoCodeTxs', {        
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        discount: {
            type: DataTypes.DECIMAL(10,8),
            allowNull: true,
            defaultValue: 0
        }, 
        discountAmount: {
            type: DataTypes.DECIMAL(10,8),
            allowNull: true,
            defaultValue: 0
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'MXN',
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'ACTIVE'
        }
    })
}