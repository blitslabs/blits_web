module.exports = (sequelize, DataTypes) => {
    return sequelize.define('loan', {
        aCoinLoanId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bCoinLoanId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lender: {
            type: DataTypes.STRING,
            allowNull: true
        },    
        borrower: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lenderAuto: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        secretHashA1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        secretHashB1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        secretHashAutoB1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        secretA1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        secretB1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        secretAutoB1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bCoinApproveExpiration: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bCoinLoanExpiration: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bCoinAcceptExpiration: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        principal: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        interest: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bCoinState: {
            type: DataTypes.STRING,
            allowNull: true
        },
        assetSymbol: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tokenAddress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        aCoinLoanExpiration: {
            type: DataTypes.STRING,
            allowNull: true
        },
        aCoinSeizureExpiration: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        aCoinSeizableCollateral: {
            type: DataTypes.STRING,
            allowNull: true
        },
        aCoinRefundableCollateral: {
            type: DataTypes.STRING,
            allowNull: true
        },
        collateralizationRatio: {
            type: DataTypes.STRING,
            allowNull: true
        },
        aCoinState: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lenderEmail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        borrowerEmail: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}