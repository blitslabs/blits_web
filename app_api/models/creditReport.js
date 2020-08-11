module.exports = (sequelize, DataTypes) => {
    return sequelize.define('creditReport', {
        folioConsulta: {
            type: DataTypes.STRING,
            allowNull: true
        },
        folioConsultaOtorgante: {
            type: DataTypes.STRING,
            allowNull: true
        },
        claveOtorgante: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        declaracionesConsumidor: {
            type: DataTypes.STRING,
            allowNull: true
        },
        apellidoPaterno: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        apellidoMaterno: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nombres: {
            type: DataTypes.STRING,
            allowNull: true
        },
        RFC: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nacionalidad: {
            type: DataTypes.STRING,
            allowNull: true
        },
        residencia: {
            type: DataTypes.STRING,
            allowNull: true
        },
        estadoCivil: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sexo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        numeroDependientes: {
            type: DataTypes.STRING,
            allowNull: true
        },        
    })
}