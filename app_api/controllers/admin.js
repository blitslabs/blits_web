const User = require('../models/sequelize').User
const Balance = require('../models/sequelize').Balance
const AdminPermission = require('../models/sequelize').AdminPermission
const Picture = require('../models/sequelize').Picture
const passport = require('passport')
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const crypto = require('crypto')
const fs = require('fs')

module.exports.getAdminData = (req, res) => {
    const userId = req.user.id

    if (!userId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing authentication token' })
        return
    }

    sequelize.transaction(async (t) => {
        const user = await User.findOne({ where: { id: userId }, transaction: t })
        sendJSONresponse(res, 200, { status: 'OK', payload: user })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la operación' })
            return
        })
}

module.exports.adminLogin = (req, res) => {

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

        User.findOne({
            where: {
                accountType: 'ADMIN',
                status: 'ACTIVE'
            },

        })
            .then((admin) => {
                if (!admin) {
                    sendJSONresponse(res, 404, { status: 'ERROR', message: 'El usuario no existe o no tiene suficientes privilegios' })
                    return
                }
                sendJSONresponse(res, 200, { status: 'OK', token: token })
                return
            })

    })(req, res)

}



module.exports.checkPrivileges = function (req, res) {
    const userId = req.user.id

    if (!userId) {
        sendJSONresponse(res, 404, { message: 'Ingresa todos los campos requeridos' })
        return
    }

    User.findOne({
        where: {
            id: userId,
            accountType: 'ADMIN',
            status: 'ACTIVE'
        },
        attributes: ['id', 'email', 'accountType', 'accountLevel']
    })
        .then((user) => {
            if (!user) {
                sendJSONresponse(res, 401, { status: 'ERROR', message: 'Your account does not have enough privileges' })
                return
            }

            sendJSONresponse(res, 200, { status: 'OK', payload: 'AUTHORIZED', user })
            return
        })
}


module.exports.getAdminPermissions = (req, res) => {
    const userId = req.user.id

    sequelize.transaction(async (t) => {
        const permissions = await AdminPermission.findOne({
            where: {
                userId
            },
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: permissions })
        return
    })
        .catch(function (err) {
            console.log(err)
            sendJSONresponse(res, 404, { message: 'Error al intentar realizar la operación' })
            return
        })
}

module.exports.getAdminUsers = (req, res) => {

    sequelize.transaction(async (t) => {
        const adminUsers = await User.findAll({
            where: {
                accountType: 'ADMIN'
            },
            status: 'ACTIVE'
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: adminUsers })
        return
    })
        .catch(function (err) {
            console.log(err)
            sendJSONresponse(res, 404, { message: 'Error al intentar realizar la operación' })
            return
        })
}

module.exports.getAdminUser = (req, res) => {

    const userId = req.params.userId

    sequelize.transaction(async (t) => {
        const permissions = await AdminPermission.findOne({
            where: {
                userId
            },
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: permissions })
        return
    })
        .catch(function (err) {
            console.log(err)
            sendJSONresponse(res, 404, { message: 'Error al intentar realizar la operación' })
            return
        })
}

module.exports.createAdminUser = (req, res) => {
    const userId = req.user.id

    // account data
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const password = req.body.password
    const rpassword = req.body.rpassword
    const pictureData = req.body.pictureData

    // permissions
    const dashboard = req.body.dashboard
    const globalMap = req.body.globalMap
    const users = req.body.users
    const drivers = req.body.drivers
    const admins = req.body.admins
    const documents = req.body.documents
    const rides = req.body.rides
    const vehicles = req.body.vehicles
    const vehicleMapping = req.body.vehicleMapping
    const zones = req.body.zones
    const farePlans = req.body.farePlans
    const wallets = req.body.wallets
    const finances = req.body.finances
    const paymentHistory = req.body.paymentHistory
    const bankAccounts = req.body.bankAccounts
    const reviews = req.body.reviews
    const promoCodes = req.body.promoCodes
    const referrals = req.body.referrals
    const pushNotifications = req.body.pushNotifications
    const support = req.body.support
    const lostItems = req.body.lostItems
    const businessSettings = req.body.businessSettings
    const paymentSettings = req.body.paymentSettings
    
    if (!userId || !name || !email || !phone || !password || !rpassword) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    if (password !== rpassword) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Las contraseñas ingresadas no coinciden' })
        return
    }

    sequelize.transaction(async (t) => {

        // Check that user has permissions
        const permissions = await AdminPermission.findOne({
            where: {
                userId,
            },
            transaction: t
        })

        if (!permissions || permissions.admins == 0) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'No tienes suficientes permisos para realizar la acción' })
            return
        }

        const [user, created] = await User.findOrCreate({
            where: {
                $or: [
                    { email: { $eq: email } },
                    { phone: { $eq: phone } }
                ]
            },
            defaults: {
                name, email, phone,
                accountType: 'ADMIN',
                emailVerified: 1,
                phoneVerified: 1
            },
            transaction: t
        })

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

        await Balance.create({
            userId: user.id,
            currency: 'MXN',
            available: 0,
            locked: 0
        }, { transaction: t })

        if (!created) {
            await AdminPermission.update({
                dashboard,
                globalMap,
                users,
                drivers,
                admins,
                documents,
                rides,
                vehicles,
                vehicleMapping,
                zones,
                farePlans,
                wallets,
                finances,
                paymentHistory,
                bankAccounts,
                reviews,
                promoCodes,
                referrals,
                pushNotifications,
                support,
                lostItems,
                businessSettings,
                paymentSettings,
            }, {
                where: {
                    userId: user.id,
                },
                transaction: t
            })
        } else {
            await AdminPermission.create({
                userId: user.id,
                dashboard,
                globalMap,
                users,
                drivers,
                admins,
                documents,
                rides,
                vehicles,
                vehicleMapping,
                zones,
                farePlans,
                wallets,
                finances,
                paymentHistory,
                bankAccounts,
                reviews,
                promoCodes,
                referrals,
                pushNotifications,
                support,
                lostItems,
                businessSettings,
                paymentSettings,
            }, { transaction: t })
        }

        const payload = await User.findOne({
            where: {
                id:  user.id
            },
            include: [
                { model: AdminPermission }
            ],
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: payload, message: 'Usuario y permisos creados correctamente' })
        return

    })
        .catch(function (err) {
            console.log(err)
            sendJSONresponse(res, 404, { message: 'Error al intentar realizar la operación' })
            return
        })
}

module.exports.updateAdminUserPermissions = (req, res) => {

    const adminId = req.user.id    
    const userId = req.body.userId

    // permissions
    const dashboard = req.body.dashboard
    const globalMap = req.body.globalMap
    const users = req.body.users
    const drivers = req.body.drivers
    const admins = req.body.admins
    const documents = req.body.documents
    const rides = req.body.rides
    const vehicles = req.body.vehicles
    const vehicleMapping = req.body.vehicleMapping
    const zones = req.body.zones
    const farePlans = req.body.farePlans
    const wallets = req.body.wallets
    const finances = req.body.finances
    const paymentHistory = req.body.paymentHistory
    const bankAccounts = req.body.bankAccounts
    const reviews = req.body.reviews
    const promoCodes = req.body.promoCodes
    const referrals = req.body.referrals
    const pushNotifications = req.body.pushNotifications
    const support = req.body.support
    const lostItems = req.body.lostItems
    const businessSettings = req.body.businessSettings
    const paymentSettings = req.body.paymentSettings

    if(!adminId || !userId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos'})
        return
    }

    sequelize.transaction(async (t) => {

        // Check that user has permissions
        let permissions = await AdminPermission.findOne({
            where: {
                userId: adminId,
            },
            transaction: t
        })

        if (!permissions || permissions.admins == 0) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'No tienes suficientes permisos para realizar la acción' })
            return
        }

        await AdminPermission.update({
            dashboard,
            globalMap,
            users,
            drivers,
            admins,
            documents,
            rides,
            vehicles,
            vehicleMapping,
            zones,
            farePlans,
            wallets,
            finances,
            paymentHistory,
            bankAccounts,
            reviews,
            promoCodes,
            referrals,
            pushNotifications,
            support,
            lostItems,
            businessSettings,
            paymentSettings,
        }, {
            where: {
                userId,
            },
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: permissions, message: 'Permisos actualizados correctamente' })
        return

    })
        .catch(function (err) {
            console.log(err)
            sendJSONresponse(res, 404, { message: 'Error al intentar realizar la operación' })
            return
        })
}

module.exports.deleteAdminUser = (req, res) => {
    const adminId = req.user.id
    const userId = req.params.userId

    sequelize.transaction(async (t) => {

        // Check that user has permissions
        const permissions = await AdminPermission.findOne({
            where: {
                userId: adminId,
            },
            transaction: t
        })

        if (!permissions || permissions.admins == 0) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'No tienes suficientes permisos para realizar la acción' })
            return
        }

        await User.destroy({
            where: {
                id: userId,
            },
            limit: 1,
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', message: 'Administrador eliminado correctamente' })
        return
    })
        .catch(function (err) {
            console.log(err)
            sendJSONresponse(res, 404, { message: 'Error al intentar realizar la operación' })
            return
        })
}