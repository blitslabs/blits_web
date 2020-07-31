module.exports = (sequelize,DataTypes) => {
    return sequelize.define('promoTx', {        
        promoCodeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            defaultValue: 0
        },          
        discountAmount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            defaultValue: 0
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'ACTIVE'
        }
    })
}