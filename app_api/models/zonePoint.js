module.exports = (sequelize, DataTypes) => {
    return sequelize.define('zonePoint', {
        zoneId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        lat: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lng: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ACTIVE'
        },        
    })
}