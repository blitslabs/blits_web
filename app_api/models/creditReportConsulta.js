module.exports = (sequelize, DataTypes) => {
    return sequelize.define('creditReportConsulta', {
        creditReportId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fechaConsulta: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nombreOtorgante: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        telefonoOtorgante: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tipoCredito: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        claveUnidadMonetaria: {
            type: DataTypes.STRING,
            allowNull: true
        },
        importeCredito: {
            type: DataTypes.STRING,
            allowNull: true
        },        
        
    })
}