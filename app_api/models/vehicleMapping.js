module.exports = (sequelize, DataTypes) => {
    return sequelize.define('vehicleMapping', {
        serviceVehicleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        serviceFareId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        zoneId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ACTIVE'
        }        
    })
}