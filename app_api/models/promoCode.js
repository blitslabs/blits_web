module.exports = (sequelize,DataTypes) => {
    return sequelize.define('promoCode', {        
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        discount: {
            type: DataTypes.DECIMAL(16,8),
            allowNull: true,
            defaultValue: 0
        },          
        expDate: {
            type: DataTypes.DATE,
            allowNull: false,
           
        },
        usedCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        limitAmount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            defaultValue: 0
        },
        limitRedeemTimes: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        targetUser: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'NEW_USER'
        },
        zoneId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'ACTIVE'
        }
    })
}