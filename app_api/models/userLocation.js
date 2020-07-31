module.exports = (sequelize, DataTypes) => {
    return sequelize.define('userLocation', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        lat: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0'
        },
        lng: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0'
        },
        altitude: {
            type: DataTypes.STRING,
            allowNull: true,            
        },
        accuracy: {
            type: DataTypes.STRING,
            allowNull: true
        },
        altitudeAccurary: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        direction: {
            type: DataTypes.STRING,
            allowNull: true
        },
        speed: {
            type: DataTypes.STRING,
            allowNull: true
        },
    })
}