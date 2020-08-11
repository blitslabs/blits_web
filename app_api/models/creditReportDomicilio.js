module.exports = (sequelize, DataTypes) => {
    return sequelize.define('creditReportDomicilio', {
        creditReportId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        coloniaPoblacion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        delegacionMunicipio: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ciudad: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: true
        },
        CP: {
            type: DataTypes.STRING,
            allowNull: true
        },   
        fechaResidencia: {
            type: DataTypes.STRING,
            allowNull: true
        },      
        fechaRegistroDomicilio: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
    })
}