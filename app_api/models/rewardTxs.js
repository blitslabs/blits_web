module.exports = (sequelize,DataTypes) => {
    return sequelize.define('rewardTxs', {        
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rideId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        points: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0
        },        
        rewardPercentage: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'COMPLETED'
        }
    })
}