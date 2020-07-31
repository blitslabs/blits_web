module.exports = (sequelize, DataTypes) => {
    return sequelize.define('transaction', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        driverId: {
            type: DataTypes.INTEGER(11),            
            references: {
                model: 'users',
                key: 'id'
            }
        },
        rideId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        operation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        paymentMethodId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'MXN'
        },
        baseFare: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0
        },
        distanceFare: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0
        },
        tax: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0
        },
        vat: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0,
            allowNull: true
        },
        total: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0,
            allowNull: true
        },
        comission: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0,
            allowNull: true,
        },
        discount: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0,
            allowNull: true,
        },
        concept: {
            type: DataTypes.STRING,
            allowNull: true
        },
        reference: {
            type: DataTypes.STRING,
            allowNull: true
        },
        trackingKey: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'PENDING'
        },

    })
}