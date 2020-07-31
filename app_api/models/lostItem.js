module.exports = (sequelize, DataTypes) => {
    return sequelize.define('lostItem', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        driverId: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'users',
                key: 'id'
            },
            allowNull: false,
        },
        rideId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        itemDescription: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        imageDescription: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        pictureId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'PENDING'
        }
    })
}