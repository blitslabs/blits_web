module.exports = (sequelize, DataTypes) => {
    return sequelize.define('serviceVehicle', {
        vehicleName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        seatCapacity: {
            type: DataTypes.STRING,
            allowNull: true
        },
        baseFare: {
            type: DataTypes.DECIMAL(10, 2)
        },
        distanceFare: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: 0
        },
        pictureId: {
            type: DataTypes.INTEGER,
            allowNull: false,            
        },
        createdBy: {
            type: DataTypes.INTEGER(11),            
            references: {
                model: 'users',
                key: 'id'
            },
            allowNull: true
        }
    })
}