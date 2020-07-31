module.exports = (sequelize, DataTypes) => {
    return sequelize.define('adminPermission', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dashboard: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        globalMap: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        users: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        drivers: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        admins:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        documents: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        rides: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        vehicles: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        vehicleMapping: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        zones: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        farePlans:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        wallets: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        finances: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        paymentHistory: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        bankAccounts: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        reviews: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        promoCodes: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        referrals: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        pushNotifications: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        support: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        lostItems: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        businessSettings: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        paymentSettings: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'ACTIVE'
        },
    })
}