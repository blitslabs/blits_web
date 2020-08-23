module.exports = (sequelize, DataTypes) => {
    return sequelize.define('asset', {
        assetName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        assetSymbol: {
            type: DataTypes.STRING,
            allowNull: true
        },
        priceUSD: {
            type: DataTypes.STRING,
            allowNull: true
        },
        priceBTC: {
            type: DataTypes.STRING,
            allowNull: true
        },
        contractAddress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        abi: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isStableCoin: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true
        }
    })
}