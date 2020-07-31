module.exports = (sequelize,DataTypes) => {
    return sequelize.define('referralRule', {                        
        referralDiscountPercentage: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0
        }
    })
}