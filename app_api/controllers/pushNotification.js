const User = require('../models/sequelize').User
const PushNotification = require('../models/sequelize').PushNotification
const RegistrationKey = require('../models/sequelize').RegistrationKey
const Picture = require('../models/sequelize').Picture
const sendJSONresponse = require('../../utils/index.js').sendJSONresponse
const sequelize = require('../models/sequelize').sequelize
const crypto = require('crypto')
const fs = require('fs')
const firebaseAdmin = require('firebase-admin')
// const serviceAccount = require('../../firebaseAccountKey.json')

// firebaseAdmin.initializeApp({
//     credential: firebaseAdmin.credential.cert(serviceAccount),
//     databaseURL: "https://blits-21913.firebaseio.com"
// })

module.exports.testNotification = (req, res) => {
    const userId = req.body.userId
    const msgTitle = req.body.msgTitle
    const msgBody = req.body.msgBody

    if (!userId || !msgTitle || !msgBody) {
        sendJSONresponse(res, 404, { message: 'Missing required fields' })
        return
    }

    sequelize.transaction(async (t) => {
        let registrationKey = await RegistrationKey.findOne({
            where: {
                userId
            },
            transaction: t
        })

        if (!registrationKey) {
            sendJSONresponse(res, 404, { message: 'User does not have registrationId ' })
            return
        }

        const message = {
            data: {
                title: msgTitle,
                body: msgBody,
                image: 'www/img/logo.png'
            },
            token: registrationKey.registrationId
        }

        // Send Notification to one device
        // https://firebase.google.com/docs/cloud-messaging/send-message
        let response = await firebaseAdmin.messaging().send(message)

        console.log(response)
        sendJSONresponse(res, 200, { message: 'OK' })
        return

    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { message: err })
            return
        })
}

module.exports.getAllNotificationsByPage = (req, res) => {
    const page = req.params.page ? parseInt(req.params.page) : 1
    const limit = 50
    let offset = 0

    if (!page || page <= 0 || isNaN(page)) {
        sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        let results, pushNotifications, pages

        results = await PushNotification.findAndCount({ transaction: t })

        pages = Math.ceil(results.count / limit)

        offset = limit * (page - 1)

        pushNotifications = await PushNotification.findAll({
            limit,
            offset,
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: pushNotifications })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.createPushNotification = (req, res) => {
    const userId = req.user.id
    const title = req.body.title
    const message = req.body.message
    const notificationType = req.body.notificationType
    const targetUser = req.body.targetUser
    const url = req.body.url
    const zoneId = req.body.zoneId
    const expDate = req.body.expDate
    const pictureData = req.body.pictureData

    if (!userId || !title || !message || !notificationType || !targetUser) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    if (!(notificationType === 'GENERAL' || notificationType === 'LOCATION')) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa un tipo de notificación válido' })
    }

    if (notificationType === 'LOCATION' && !zoneId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa el ID de la zone geográfica' })
        return
    }

    if (!(targetUser === 'USER' || targetUser === 'DRIVER')) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa un tipo de usuario válido' })
        return
    }

    sequelize.transaction(async (t) => {

        // let users
        // if(notificationType === 'LOCATION') {
        //     users = await User.findAll({
        //         where: {

        //         }
        //     })
        // }
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

        const pushNotification = await PushNotification.create({
            title,
            message,
            notificationType,
            targetUser,
            url,
            zoneId,
            expDate,
            pictureId: pictureData ? picture.id : null
        }, { transaction: t })

        if (!pushNotification) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Error al intentar crear la notificación' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: pushNotification, message: 'Notificación creada correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.deletePushNotification = (req, res) => {
    const notificationId = req.params.notificationId

    if (!notificationId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const pushNotification = await PushNotification.findOne({where: {id: notificationId}, transaction: t})

        if(!pushNotification) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Notificación no encontrada'})
            return
        }

        await PushNotification.destroy({ where: {id: notificationId}, transaction: t, limit: 1})

        sendJSONresponse(res, 200, { status:'OK', message: 'Notificación eliminada correctamente'})
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}