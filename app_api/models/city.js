module.exports = (sequelize, DataTypes) => {
    return sequelize.define('city', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },        
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stateId: {
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