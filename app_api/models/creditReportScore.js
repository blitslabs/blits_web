module.exports = (sequelize, DataTypes) => {
    return sequelize.define('creditReportScore', {
        creditReportId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombreScore: {
            type: DataTypes.STRING,
            allowNull: true
        },
        valor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        razones: {
            type: DataTypes.STRING,
            allowNull: true
        },        
    })
}