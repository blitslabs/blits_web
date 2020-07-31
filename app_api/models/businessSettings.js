module.exports = (sequelize, DataTypes) => {
    return sequelize.define('businessSettings', {
        businessName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        businessLogoImageId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        businessIconImageId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        copyrightContent: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        playStoreUserApp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        playStoreDriverApp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        appStoreUserApp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        appStoreDriverApp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        distanceUnit: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'KM'
        },
        waitingTimeOut: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '5',
        },
        providerSearchRadius: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '5'
        },
        emergencyNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contactNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        scheduleTriggerTime: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        driverPhoneValidation: {
            type: DataTypes.STRING,
            alloNull:true,
        },
        driverEmailValidation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userPhoneValidation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userEmailValidation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rideCancellationTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rideCancellationCharges: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
        },
        allowChat: {
            type: DataTypes.STRING,
            allowNull: true
        },
        socialLoginUser: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        socialLoginDriver: {
            type: DataTypes.STRING,
            allowNull: true
        }




    })
}