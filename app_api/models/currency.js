module.exports = (sequelize, DataTypes) => {
    return sequelize.define('currency', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        symbol: {
            type: DataTypes.STRING,
            allowNull: false
        },        
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ACTIVE'
        },        
    })
}