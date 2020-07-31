module.exports = (sequelize, DataTypes) => {
    return sequelize.define('requiredDocument', {        
        documentName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        documentType: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        documentExp: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ACTIVE'
        },
    })
}