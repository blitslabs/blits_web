const crypto = require('crypto')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {        
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: true
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        motherLastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rfc: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dateOfBirth: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: true
        },
        interiorNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        exteriorNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        settlement: {
            type: DataTypes.STRING,
            allowNull: true
        },
        municipality: {
            type: DataTypes.STRING,
            allowNull: true
        },
        postalCode: {
            type: DataTypes.STRING,
            allowNull: true
        },        
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dialCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },            
        emailVerified: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        phoneVerified: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        accountType: {
            type: DataTypes.STRING,
            allowNull: true,                      
        },        
        accountLevel: {
            type: DataTypes.INTEGER,
            allowNull: true,
           defaultValue: 1
        },
        rating: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            defaultValue: 5
        },
        pictureId: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: true,
        },
        documentsStatus: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'PENDING'
        },
        onlineStatus: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'OFFLINE'
        },
        lastLat: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastLng: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ACTIVE'
        }
    })

    User.prototype.setPassword = function(password) {
        this.salt = crypto.randomBytes(16).toString('hex')
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
    }

    User.prototype.validPassword = function(password) {
        const hash = crypto.pbkdf2Sync(String(password), this.salt, 1000, 64, 'sha512').toString('hex')
        return this.hash === hash
    }

    User.prototype.generateJwt = function() {
        const expiry = new Date()
        expiry.setDate(expiry.getDate() + 1)
        return jwt.sign({
            id: this.id,
            email: this.email,
            primerNombre: this.primerNombre,
            apellidoPaterno: this.apellidoPaterno,
            accountType: this.accountType,
            accountLevel: this.accountLevel,
            exp: parseInt(expiry.getTime() / 1000)
        }, process.env.JWT_SECRET)
    }

    return User
}