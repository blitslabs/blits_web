module.exports = (sequelize,DataTypes) => {
    return sequelize.define('pushNotification',{
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        notificationType: { // LOCATION or GENERAL
            type: DataTypes.STRING,
            allowNull: true, 
            defautlValue: 'GENERAL'
        },
        targetUser: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'USER' // USER or DRIVER
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        zoneId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        pictureId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        expDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'COMPLETED'
        }
    })
}