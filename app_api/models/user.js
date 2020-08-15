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
        accountType: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'USER'
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