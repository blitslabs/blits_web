module.exports = (sequelize, DataTypes) => {
    return sequelize.define('preCreditRequest', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        secondName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        secondLastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dateOfBirth: {
            type: DataTypes.STRING,
            allowNull: true
        },
        entidadNacimiento: {
            type: DataTypes.STRING,
            allowNull: true
        },
        curp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rfc: {
            type: DataTypes.STRING,
            allowNull: true
        },
        calle: {
            type: DataTypes.STRING,
            allowNull: true
        },
        numeroExt: {
            type: DataTypes.STRING,
            allowNull: true
        },
        colonia: {
            type: DataTypes.STRING,
            allowNull: true
        },
        municipio: {
            type: DataTypes.STRING,
            allowNull: true
        },
        entidadFederativa: {
            type: DataTypes.STRING,
            allowNull: true
        },
        postalCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        creditAmount: {
            type: DataTypes.STRING,
            allowNull: true
        },
        creditType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        propertyValue: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ownsProperty: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sourceOfResources: {
            type: DataTypes.STRING,
            allowNull: true
        },
        verifiableIncome: {
            type: DataTypes.STRING,
            allowNull: true
        },
        unverifiableIncome: {
            type: DataTypes.STRING,
            allowNull: true
        },
        jobDescription: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nip: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        saldoVencido: {
            type: DataTypes.STRING,
            allowNull: true
        },
        result: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        montoMaximo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        creditReportId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    })
}