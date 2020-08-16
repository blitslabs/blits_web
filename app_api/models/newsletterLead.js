module.exports = (sequelize, DataTypes) => {
    return sequelize.define('newsletterLead', {
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },        
    })
}