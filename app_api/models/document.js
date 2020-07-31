module.exports = (sequelize, DataTypes) => {
    return sequelize.define('document', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        documentType: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'DRIVER'
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pictureId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'IN_REVIEW'
        },
        expDate: {
            type: DataTypes.DATE,
            allowNull: true
        }
    })
}