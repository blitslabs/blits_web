module.exports = (sequelize, DataTypes) => {
    return sequelize.define('settings', {
        aCoinPubKey: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        aCoinPrivKey: {
            type: DataTypes.STRING,
            allowNull: true,
        },        
        bCoinPubKey: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bCoinPrivKey: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        
    })
}