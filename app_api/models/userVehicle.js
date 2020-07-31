module.exports = (sequelize, DataTypes) => {
    return sequelize.define('userVehicle', {
        serviceVehicleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        vehiclePlates: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vehicleModel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vehicleColor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        vehicleOwner: {
            type: DataTypes.STRING,
            allowNull: true
        },
    })
}