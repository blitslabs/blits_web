module.exports = (sequelize,DataTypes) => {
    return sequelize.define('rewardRule', {                        
        minimumPointsToRedeem: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0
        },        
        rewardPointsPercentage: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 5
        },
        pointRedeemPrice: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 1
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'ACTIVE'
        }
    })
}