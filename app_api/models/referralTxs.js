module.exports = (sequelize,DataTypes) => {
    return sequelize.define('referralTxs', {        
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rideId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        discountAmount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0
        },        
        discountPercentage: {
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