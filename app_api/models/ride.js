module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ride', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        driverId: {
            type: DataTypes.INTEGER(11),            
            references: {
                model: 'users',
                key: 'id'
            }
        },
        serviceVehicleId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },        
        startLat: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startLng: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        endLat: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        endLng: {
            type: DataTypes.STRING,
            allowNull: true,
        },        
        endTimestamp: {
            type: DataTypes.DATE,
            allowNull: true
        }, 
        startAddress: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        endAddress: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        zoneId: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },        
        comments: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        startTimestamp: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        endTimestamp: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        scheduled:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        scheduledTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },        
        totalDistance: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
        },
        transactionId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,            
        },
    })
}