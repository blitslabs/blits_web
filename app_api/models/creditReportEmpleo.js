module.exports = (sequelize, DataTypes) => {
    return sequelize.define('creditReportEmpleo', {
        creditReportId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombreEmpresa: {
            type: DataTypes.STRING,
            allowNull: true
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        coloniaPoblacion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        delegacionMunicipio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ciudad: {
            type: DataTypes.STRING,
            allowNull: true
        },
        CP: {
            type: DataTypes.STRING,
            allowNull: true
        },   
        numeroTelefono: {
            type: DataTypes.STRING,
            allowNull: true
        },      
        extension: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        fax: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        puesto: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        fechaContratacion: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        claveMoneda: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        salarioMensual: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        fechaUltimoDiaEmpleo: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        fechaVerificacionEmpleo: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
    })
}