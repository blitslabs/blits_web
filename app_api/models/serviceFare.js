module.exports = (sequelize, DataTypes) => {
    return sequelize.define('serviceFare', {
        farePlanName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startKm: {
            type: DataTypes.STRING,
            allowNull: true
        },
        upToKm: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pricePerKm: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        waitingPricePerMinute: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        applyPeakFare: {
            type: DataTypes.STRING,
            allowNull: true
        },
        applyNightFare: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nightFareStart: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nightFareEnd: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nightFare: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0
        },
        mondayPeakFareStartTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mondayPeakFareEndTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mondayPeakFare: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0
        },
        tuesdayPeakFareStartTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tuesdayPeakFareEndTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tuesdayPeakFare: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0
        },
        wednesdayPeakFareStartTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        wednesdayPeakFareEndTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        wednesdayPeakFare: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0
        },
        thursdayPeakFareStartTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        thursdayPeakFareEndTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        thursdayPeakFare: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0
        },
        fridayPeakFareStartTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fridayPeakFareEndTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fridayPeakFare: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0
        },
        saturdayPeakFareStartTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        saturdayPeakFareEndTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        saturdayPeakFare: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0
        },
        sundayPeakFareStartTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sundayPeakFareEndTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sundayPeakFare: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ACTIVE',
        },
        createdBy: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'users',
                key: 'id'
            }
        }
    })
}