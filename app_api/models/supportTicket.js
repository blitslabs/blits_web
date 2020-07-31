module.exports = (sequelize, DataTypes) => {
    return sequelize.define('supportTicket', {               
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,            
        },
        topic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reply: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ACTIVE'
        },
    })
}