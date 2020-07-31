const User = require('../models/sequelize').User
const Document = require('../models/sequelize').Document
const Picture = require('../models/sequelize').Picture
const sequelize = require('../models/sequelize').sequelize

const sendJSONresponse = require('../../utils/index').sendJSONresponse
const { Op } = require('sequelize')
const moment = require('moment')
const crypto = require('crypto')
const fs = require('fs')

module.exports.uploadDocument = function (req, res) {
    const userId = req.user.id
    const documentName = req.body.documentName
    const documentData = req.body.documentData

    if (!userId || !documentName || !documentData) {
        sendJSONresponse(res, 404, { message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        let user = await User.findOne({
            where: {
                id: userId
            },
            transaction: t
        })

        if (!user) {
            sendJSONresponse(res, 404, { message: 'El usuario no existe' })
            return
        }

        let documentBuffer = new Buffer(documentData, 'base64')
        let newName = crypto.randomBytes(16).toString('hex')
        let hash = crypto.randomBytes(16).toString('hex')
        let filePath = './uploads/documents/' + newName + '.jpeg'

        try {
            fs.writeFile(filePath, documentBuffer, function () {
                // save document record in db
                Document.create({
                    userId,
                    name: documentName,
                    hash,
                    filePath: filePath,
                    status: 'in_review'
                }, { transaction: t })
                    .then((document) => {
                        if (!document) {
                            sendJSONresponse(res, 404, { message: 'Error uploading file' })
                            return
                        }

                        sendJSONresponse(res, 200, { message: 'Documento subido correctamente' })
                        return
                    })
            })
        }
        catch (err) {
            console.log('Error: ' + error)
        }

    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { message: 'Ocurrió un error al intentar realizar la operación' })
            return
        })
}


// Only admins can view documents
module.exports.getDocument = function (req, res) {

    const documentId = req.params.documentId

    if (!documentId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
    }

    sequelize.transaction(async (t) => {

        let document = await Document.findOne({
            where: {
                id: documentId
            },
            include: [
                { model: User },
            ],
            transaction: t
        })

        if (!document) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Documento no encontrado' })
            return
        }


        sendJSONresponse(res, 200, { status: 'OK', payload: document })
        return

    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { message: 'Ocurrió un error al intentar realizar la operación' })
            return
        })
}

module.exports.getUserDocuments = (req, res) => {
    const userId = req.params.userId

    if (!userId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const documents = await Document.findAll({
            where: {
                userId,
            },
            transaction: t
        })

        if (!documents) {
            sendJSONresponse(res, 200, { status: 'OK', message: 'No se encontraron documentos' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: documents })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la operación' })
            return
        })

}

module.exports.updateDocument = (req, res) => {
    const documentId = req.body.documentId
    const pictureData = req.body.pictureData
    const expDate = req.body.expDate

    if (!documentId || !expDate) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const document = await Document.findOne({
            where: {
                id: documentId
            },
            transaction: t
        })

        if(!document) {
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Documento no encontrado'})
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
                    userId: document.userId,
                    path: imagePath
                }, { transaction: t })
            }
            catch (error) {
                console.log(error)
                sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar guardar la imagen' })
                return
            }
        }    
        
        document.expDate = expDate
        
        if(pictureData) {
            document.pictureId = picture.id
        }

        await document.save({ transaction: t })

        sendJSONresponse(res, 200, {status: 'OK', payload: document, message: 'Documento actualizado correctamente'})
        return
        
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la operación' })
            return
        })
}

module.exports.updateDocumentStatus = (req, res) => {
    const documentId = req.params.documentId
    const documentStatus = req.body.documentStatus

    if (!documentId || !documentStatus) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    if (!(documentStatus === 'APPROVED' || documentStatus === 'REJECTED' || documentStatus === 'UNREADABLE')) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa un estado válido' })
        return
    }

    sequelize.transaction(async (t) => {
        const document = await Document.update({
            status: documentStatus,
        }, {
            where: {
                id: documentId,
            },
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: document, message: 'Estado del documento actualizado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la operación' })
            return
        })
}