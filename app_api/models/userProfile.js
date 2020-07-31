module.exports = (sequelize, DataTypes) => {
    return sequelize.define('userProfile', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
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
            allowNull: true
        },
        mothersLastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dateOfBirth: {
            type: DataTypes.STRING,
            allowNull: true
        },
        countryOfBirth: {
            type: DataTypes.STRING,
            allowNull: true
        },
        stateOfBirth: {
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
        
        
    })
}