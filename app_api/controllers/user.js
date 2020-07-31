const User = require('../models/sequelize').User
const Balance = require('../models/sequelize').Balance
const Ride = require('../models/sequelize').Ride
const Picture = require('../models/sequelize').Picture
const Document = require('../models/sequelize').Document
const AuthRequest = require('../models/sequelize').AuthRequest
const sequelize = require('../models/sequelize').sequelize
const crypto = require('crypto')
const fs = require('fs')
const moment = require('moment')
const sendJSONresponse = require('../../utils/index').sendJSONresponse

module.exports.getAllUsersByTypeAndPage = (req, res) => {
    const accountType = req.params.accountType ? req.params.accountType : 'ALL'
    const page = req.params.page ? parseInt(req.params.page) : 1
    const limit = 50
    let offset = 0

    if (!page || page <= 0) {
        sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {

        let result, users, pages
        if (accountType === 'ALL') {
            result = await User.findAndCount({
                where: {
                    status: { $not: 'DELETED' }
                },
                transaction: t
            })

            pages = Math.ceil(result.count / limit)
            offset = limit * (page - 1)

            users = await User.findAll({
                where: {
                    status: { $not: 'DELETED' }
                },
                include: [
                    { model: Balance },
                ],
                limit,
                offset,
                transaction: t
            })

        } else if (accountType === 'DRIVER') {
            result = await User.findAndCount({
                where: {
                    accountType,
                    status: { $not: 'DELETED' }
                },
                transaction: t
            })

            pages = Math.ceil(result.count / limit)
            offset = limit * (page - 1)

            users = await User.findAll({
                where: {
                    accountType,
                    status: { $not: 'DELETED' }
                },
                include: [
                    { model: Balance },
                    { model: Document }
                ],
                limit,
                offset,
                transaction: t
            })
        } else {
            result = await User.findAndCount({
                where: {
                    accountType,
                    status: { $not: 'DELETED' }
                },
                transaction: t
            })

            pages = Math.ceil(result.count / limit)
            offset = limit * (page - 1)

            users = await User.findAll({
                where: {
                    accountType,
                    status: { $not: 'DELETED' }
                },
                include: [
                    { model: Balance },

                ],
                limit,
                offset,
                transaction: t
            })
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: users, count: result.count, pages: pages })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getUserDetails = (req, res) => {
    const userId = req.params.userId

    if (!userId || isNaN(userId) || userId <= 0) {
        sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {

        const user = await User.findOne({
            where: {
                id: userId,
            },
            include: [
                { model: Balance },
            ],
            transaction: t
        })

        if (!user) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Usuario no encontrado' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: user })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.updateUserDetails = (req, res) => {
    const userId = req.body.userId
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const pictureData = req.body.pictureData

    if (!userId || !name || !email || !phone) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {

        let imageBuffer, newName, imagePath, picture
        if (pictureData) {
            imageBuffer = new Buffer(pictureData, 'base64')
            newName = crypto.randomBytes(16).toString('hex')
            imagePath = './uploads/images/' + newName + '.png'

            try {
                let saveImage = new Promise((resolve, reject) => {
                    fs.writeFile(imagePath, imageBuffer, (err) => {
                        if (err) {
                            reject(err)
                        }
                        resolve(true)
                    })
                })
                await saveImage
                picture = await Picture.create({
                    userId,
                    path: imagePath
                }, { transaction: t })
            }
            catch (error) {
                console.log(error)
                sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar guardar la imagen' })
                return
            }
        }

        const user = await User.update({
            name,
            email,
            phone,
            pictureId: pictureData ? picture.id : null
        }, {
            where: {
                id: userId,
            },
            transaction: t
        })

        if (!user) {
            sendJSONresponse(res, 404, { status: 'Ocurrió un error al intentar actualizar los datos del usuario' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: user, message: 'Usuario actualizado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.changePassword = (req, res) => {
    const userId = req.body.userId
    const password = req.body.password
    const rpassword = req.body.rpassword

    if (!userId || !password || !rpassword) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    if (password !== rpassword) {
        sendJSONresponse(res, 404, { status: 'ERROR', message: 'Las contraseña ingresadas no coinciden' })
        return
    }

    sequelize.transaction(async (t) => {
        const user = await User.findOne({ where: { id: userId }, transaction: t })

        if (!user) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Usuario no encontrado' })
            return
        }

        user.setPassword(password)
        await user.save({ transaction: t })

        sendJSONresponse(res, 200, { status: 'OK', message: 'Contraseña de usuario actualizada correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.createUser = (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const password = req.body.password
    const rpassword = req.body.rpassword
    const pictureData = req.body.pictureData
    const accountType = req.body.accountType

    const rfc = req.body.rfc
    const dateOfBirth = req.body.dateOfBirth
    const gender = req.body.gender
    const street = req.body.street
    const interiorNumber = req.body.interiorNumber
    const exteriorNumber = req.body.exteriorNumber
    const settlement = req.body.settlement
    const municipality = req.body.municipality
    const postalCode = req.body.postalCode

    if (!name || !email || !phone || !password || !rpassword || !accountType) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    if (password !== rpassword) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Las contraseñas ingresadas no coinciden' })
        return
    }

    if (accountType === 'DRIVER') {
        if (!rfc || !dateOfBirth || !gender || !street || !exteriorNumber || !settlement || !municipality || !postalCode) {
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
            return
        }
    }

    sequelize.transaction(async (t) => {

        let user, created

        if (accountType === 'DRIVER') {
            [user, created] = await User.findOrCreate({
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
                    rfc, dateOfBirth, gender, street, interiorNumber,
                    exteriorNumber, settlement, municipality, postalCode
                },
                transaction: t
            })
        } else {
            [user, created] = await User.findOrCreate({
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
        }

        if (!created) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'El email o teléfono ingresado ya se encuentra registrado' })
            return
        }

        let imageBuffer, newName, imagePath, picture
        if (pictureData) {
            imageBuffer = new Buffer(pictureData, 'base64')
            newName = crypto.randomBytes(16).toString('hex')
            imagePath = './uploads/images/' + newName + '.png'

            try {
                let saveImage = new Promise((resolve, reject) => {
                    fs.writeFile(imagePath, imageBuffer, (err) => {
                        if (err) {
                            reject(err)
                        }
                        resolve(true)
                    })
                })
                await saveImage
                picture = await Picture.create({
                    userId: user.id,
                    path: imagePath
                }, { transaction: t })
            }
            catch (error) {
                console.log(error)
                sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar guardar la imagen' })
                return
            }
        }

        user.setPassword(password)
        user.pictureId = pictureData ? picture.id : null

        await user.save({ transaction: t })


        const balance = await Balance.create({
            userId: user.id,
            currency: 'MXN',
            available: 0,
            locked: 0
        }, { transaction: t })

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

                sendJSONresponse(res, 200, { status: 'OK', payload: user, message: 'Usuario creado correctamente' })
                return
            })

    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.deleteUser = (req, res) => {
    const userId = req.params.userId

    if (!userId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        await User.update({
            status: 'DELETED'
        },
            {
                where: {
                    id: userId,
                },
                limit: 1,
                transaction: t
            })

        sendJSONresponse(res, 200, { status: 'OK', message: 'Usuario eliminado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.updateUserStatus = (req, res) => {
    const userId = req.body.userId
    const status = req.body.status

    if (!userId || !status) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        await User.update({
            status,
        }, {
            where: {
                id: userId,
            },
            limit: 1,
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', message: 'Usuario actualizado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la acción' })
            return
        })
}

module.exports.updateDriverDocumentsStatus = (req, res) => {
    const userId = req.body.userId
    const documentsStatus = req.body.documentsStatus
    console.log(documentsStatus)
    if (!userId || !documentsStatus) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    if (!(documentsStatus === 'APPROVED' || documentsStatus === 'REJECTED')) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa un estado válido' })
        return
    }

    sequelize.transaction(async (t) => {
        await User.update({
            documentsStatus,
        }, {
            where: {
                id: userId,
                accountType: 'DRIVER'
            },
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', message: 'Estado de la solicitud actualizada' })
        return
    })

        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getUsersStats = (req, res) => {
    sequelize.transaction(async (t) => {
        const totalUsers = await User.count({ where: { accountType: 'USER' }, transaction: t })
        const totalBalance = await Balance.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('available')), 'total_amount']
            ],
            raw: true
        })
        const totalRides = await Ride.count({ transaction: t })

        const payload = {
            totalUsers,
            totalBalance: totalBalance[0].total_amount,
            totalRides: totalRides
        }

        sendJSONresponse(res, 200, { status: 'OK', payload })
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getDriversStats = (req, res) => {
    sequelize.transaction(async (t) => {
        const totalDrivers = await User.count({ where: { accountType: 'DRIVER ' }, transaction: t })
        const totalRides = await Ride.count({ where: { status: 'COMPLETED' }, transaction: t })
        const totalCancelledRides = await Ride.count({ where: { status: 'CANCELLED' }, transaction: t })

        const payload = {
            totalDrivers,
            totalRides,
            totalCancelledRides
        }

        sendJSONresponse(res, 200, { status: 'OK', payload })
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

