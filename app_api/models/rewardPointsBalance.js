module.exports = (sequelize,DataTypes) => {
    return sequelize.define('rewardPointsBalance', {        
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        available: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: 0
        },
        locked: {
            type: DataTypes.DECIMAL(10,8),
            allowNull: false,
            defaultValue: 0
        }
    })
}