module.exports = (sequelize, DataTypes) => {
    return sequelize.define('creditReportMensaje', {
        creditReportId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tipoMensaje: {
            type: DataTypes.STRING,
            allowNull: true
        },
        leyenda: {
            type: DataTypes.STRING,
            allowNull: true,
        },                
    })
}