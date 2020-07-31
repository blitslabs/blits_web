module.exports = (sequelize, DataTypes) => {
    return sequelize.define('state', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },        
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        countryId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ACTIVE'
        }
    })
}