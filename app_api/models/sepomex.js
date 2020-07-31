module.exports = (sequelize, DataTypes) => {
    return sequelize.define('sepomex', {
        codigoPostal: {
            type: DataTypes.STRING,
            allowNull: true
        },
        asentamiento: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tipoAsentamiento: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        municipio: {
            type: DataTypes.STRING,
            allowNull: true
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ciudad: {
            type: DataTypes.STRING,
            allowNull: true
        },
    })
}