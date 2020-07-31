module.exports = (sequelize,DataTypes) => {
    return sequelize.define('userPromoCode', {        
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
        expDate: {
            type: DataTypes.DATE,
            allowNull: false,           
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'ACTIVE'
        }
    })
}