module.exports = (sequelize, DataTypes) => {
    return sequelize.define('review', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
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
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comments: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        reviewType: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'USER_TO_DRIVER'
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ACTIVE'
        }
    })
}