const passport = require('passport')
const User = require('../models/sequelize').User
const Balance = require('../models/sequelize').Balance
const AuthRequest = require('../models/sequelize').AuthRequest
const sequelize = require('../models/sequelize').sequelize
//const emailController = require('./email')
const crypto = require('crypto')
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const checkSequentialCharacters = require('../../utils/index').checkSequentialCharacters
const { Op } = require('sequelize')
const emailValidator = require('email-validator')
const moment = require('moment')

module.exports.signup = function (req, res) {
    const email = req.body.email    
    const password = req.body.password
    const rpassword = req.body.rpassword
    const accountType = req.body.accountType
    const refCode = req.body.refCode

    // check if all field were sent
    if (!name || !email || !password || !rpassword || !accountType || !dialCode || !phone) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    // check that the passwords are the same
    if (password !== rpassword) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Las contraseñas ingresadas no coinciden' })
        return
    }

    // check password strength
    // At keast 6 characteres long, max length anything
    // Include at least 1 lower case letter
    // 1 number
    // 1 special character => !@#$%^&*
    // if (!(/^(?=.*[\d])(?=.*[a-z])(?=.*[!@#$%^&*.?+-:;])[\w!@#$%^&*.?+-:;]{8,}$/.test(password))) {
    //     sendJSONresponse(res, 422, { status: 'ERROR', message: 'Tu contraseña debe contener al menos una letra, un número, un caracter especial y tener un mínimo de 8 caracteres de largo' })
    //     return
    // }

    // password must not be the client identifier
    if (email === password || password.search(email) > 0) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Tu contraseña no puede ser igual al email asociado a la cuenta' })
        return
    }

    // password must not containt the company's name
    if (password === process.env.COMPANY_NAME || password.search(process.env.COMPANY_NAME) > 0) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Tu contraseña no puede contener el nombre de la empresa' })
        return
    }

    // password must not contain more than 3 sequential alphabetic or numerical numbers 
    // check that none of the characters repeat more than twice
    // if (!checkSequentialCharacters(password)) {
    //     sendJSONresponse(res, 422, { status: 'ERROR', message: 'Tu contraseña no puede contener más de tres caracteres numéricos o alfabéticos en forma secuencial o identicos en forma consecutiva' })
    //     return
    // }

    // check if email is valid
    if (!emailValidator.validate(email)) {
        sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ingresa un email válido' })
        return
    }

    // check account type
    if (!(accountType === 'USER' || accountType === 'DRIVER')) {
        sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ingresa un tipo de cuenta válido' })
        return
    }



    sequelize.transaction(function (t) {
        return User.findOrCreate({
            where: {
                $or: [
                    { email: { $eq: email } },
                    { phone: { $eq: phone } }
                ]
            },
            defaults: {
                name,
                email,
                phone,
                accountType,
            },
            transaction: t
        })
            .spread(function (user, created) {
                if (!created) {
                    sendJSONresponse(res, 404, { status: 'ERROR', message: 'El email o teléfono ingresado ya se encuentra registrado' })
                    return
                }

                user.setPassword(password)

                return user.save({ transaction: t })
                    .then(function () {

                        return Balance.create({
                            userId: user.id,
                            currency: 'MXN',
                            available: 0,
                            locked: 0
                        }, { transaction: t })
                            .then((balance) => {
                                // phone verification request
                                return AuthRequest.create({
                                    userId: user.id,
                                    action: 'VERIFY_PHONE',
                                    code: Math.floor(100000 + Math.random() * 900000),
                                    exp: moment().add(5, 'minutes').toDate(),
                                    used: 0
                                }, { transaction: t })
                                    .then(function (authRequest) {
                                        if (!authRequest) {
                                            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Error al intentar realizar la operación' })
                                            return
                                        }

                                        // send verification code to phone number

                                        sendJSONresponse(res, 200, { status: 'OK', message: 'Verifica teléfono ingresando el código que te enviaremos por SMS' })
                                        return
                                    })
                            })
                    })


            })
            .catch(function (err) {
                console.log(err)
                sendJSONresponse(res, 404, { message: 'Error al intentar realizar la operación' })
                return
            })
    })
        .catch(function (err) {
            console.log(err)
            sendJSONresponse(res, 404, { message: 'Error al intentar realizar la operación' })
            return
        })
}

module.exports.verifyPhone = (req, res) => {
    const phone = req.body.phone
    const code = req.body.code

    if (!phone || !code) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        let authRequest = await AuthRequest.findOne({
            where: {
                action: 'VERIFY_PHONE',
                code,
                used: 0,
                createdAt: {
                    [Op.gte]: moment().subtract(5, 'minutes')
                },
            },
            include: [
                { model: User, attributes: ['id', 'email', 'phoneVerified'] }
            ],
            transaction: t
        })

        if (!authRequest) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'El código de verificación expiró o es incorrecto' })
            return
        }

        authRequest.used = 1
        await authRequest.save({ transaction: t })
        // verify phone
        authRequest.user.phoneVerified = 1
        await authRequest.user.save({ transaction: t })
        const token = authRequest.user.generateJwt()
        sendJSONresponse(res, 200, { message: 'Email verificado correctamente', token: token })
        return

    })
        .catch((err) => {
            sendJSONresponse(res, 404, { message: 'Error al intentar realizar la operación' })
            console.log(err)
            return
        })
}

module.exports.resendPhoneCode = (req, res) => {
    const phone = req.body.phone

    if (!phone) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required parameters' })
        return
    }

    sequelize.transaction((t) => {
        return User.findOne({
            where: {
                phone: phone
            },
            transaction: t
        })
            .then((user) => {
                return AuthRequest.findOne({
                    where: {
                        userId: user.id,
                        createdAt: {
                            [Op.gte]: moment().subtract(5, 'minutes')
                        }
                    },
                    transaction: t
                })
                    .then((authRequest) => {
                        if (!authRequest) {
                            sendJSONresponse(res, 404, { message: 'El código de autenticación expiró o no existe' })
                            return
                        }

                        if (authRequest.updatedAt >= moment().subtract(1, 'minutes')) {
                            sendJSONresponse(res, 404, { message: 'Espera 1 minuto antes de reenviar el código de verificación' })
                            return
                        }
                        // send code through sms                            


                        sendJSONresponse(res, 200, { status: 'OK', message: 'Mensaje de verificación reenviado' })
                        return
                    })
            })

    })
        .catch((err) => {
            console.log(err)
        })
}


module.exports.verifyEmail = function (req, res) {
    const email = req.body.email
    const code = req.body.code

    if (!email || !code) {
        sendJSONresponse(res, 404, { message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        let authRequest = await AuthRequest.findOne({
            where: {
                action: 'verifyEmail',
                code: code,
                used: 0,
                createdAt: {
                    [Op.gte]: moment().subtract(5, 'minutes')
                },
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'email', 'emailVerified']
                }
            ],
            transaction: t
        })

        if (!authRequest) {
            sendJSONresponse(res, 404, { message: 'El código de verificación ya fue usado o es incorrecto' })
            return
        }

        // check email
        if (email !== authRequest.user.email) {
            sendJSONresponse(res, 404, { message: 'El código de verificación ya fue usado o es incorrecto' })
            return
        }

        authRequest.used = 1
        await authRequest.save({ transaction: t })
        // verify email
        authRequest.user.emailVerified = 1
        await authRequest.user.save({ transaction: t })
        const token = authRequest.user.generateJwt()
        sendJSONresponse(res, 200, { message: 'Email verificado correctamente', token: token })
        return

    })
        .catch((err) => {
            sendJSONresponse(res, 404, { message: 'Error al intentar realizar la operación' })
            console.log(err)
            return
        })
}

module.exports.login = function (req, res) {
    const email = req.body.email
    const password = req.body.password
   
    if (!email || !password) {
        sendJSONresponse(res, 404, { message: 'Ingresa todos los campos requeridos' })
        return
    }

    passport.authenticate('local', function (err, token, info) {
        if (err) {
            sendJSONresponse(res, 404, err)
            return
        }
        if (!token) {
            sendJSONresponse(res, 401, info)
            return
        }
        sendJSONresponse(res, 200, { status: 'OK', token: token })
    })(req, res)
}

module.exports.facebookAuth = (req, res) => {
    passport.authenticate('facebook', function (err, token, info) {
        if (err) {
            sendJSONresponse(res, 404, err)
            return
        }
        if (!token) {
            sendJSONresponse(res, 401, info)
            return
        }
        sendJSONresponse(res, 200, { status: 'OK', token: token })
    })(req, res)
}

module.exports.googleAuth = (req, res) => {
    passport.authenticate('google', function (err, token, info) {
        if (err) {
            sendJSONresponse(res, 404, err)
            return
        }
        if (!token) {
            sendJSONresponse(res, 401, info)
            return
        }
        sendJSONresponse(res, 200, { status: 'OK', token: token })
    })(req, res)
}