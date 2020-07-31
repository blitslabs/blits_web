module.exports = (sequelize,DataTypes) => {
    return  sequelize.define('picture', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },        
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'ACTIVE'
        }
    })
}