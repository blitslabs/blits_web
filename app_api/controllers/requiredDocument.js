const User = require('../models/sequelize').User
const RequiredDocument = require('../models/sequelize').RequiredDocument
const sequelize = require('../models/sequelize').sequelize
const { Op } = require('sequelize')
const crypto = require('crypto')
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const moment = require('moment')


module.exports.getAllRequiredDocuments = (req, res) => {

    sequelize.transaction(async (t) => {
        const documents = await RequiredDocument.findAll({
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: documents })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getAllRequiredDocumentsByAccountType = (req, res) => {
    const accountType = req.params.accountType

    if (!accountType) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const documents = await RequiredDocument.findAll({
            where: {
                documentType: accountType
            },
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: documents })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getDocumentDetails = (req, res) => {

    const documentId = req.params.documentId

    sequelize.transaction(async (t) => {
        const document = await RequiredDocument.findOne({
            where: {
                id: documentId
            },
            transaction: t
        })

        if (!document) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Required document not found' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: document })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.createRequiredDocument = (req, res) => {
    const documentName = req.body.documentName
    const documentType = req.body.documentType
    const documentExp = req.body.documentExp

    if (!documentName || !documentType || !documentExp) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required parameters' })
        return
    }

    sequelize.transaction(async (t) => {
        const document = await RequiredDocument.create({
            documentName,
            documentType,
            documentExp
        }, { transaction: t })

        if (!document) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'No fue posible crear el documento requerido' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: document, message: 'Documento creado correctamente' })
        return
    })
}

module.exports.updateRequiredDocument = (req, res) => {
    const documentId = req.body.documentId
    const documentName = req.body.documentName
    const documentType = req.body.documentType
    const documentExp = req.body.documentExp


    if (!documentId || !documentName || !documentType || !documentExp) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required parameters' })
        return
    }

    sequelize.transaction(async (t) => {
        const document = await RequiredDocument.findOne({
            where: {
                id: documentId,
            },
            transaction: t
        })

        if (!document) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'No se encontró el documento requerido' })
            return
        }

        document.documentName = documentName
        document.documenType = documentType
        document.documentExp = document.exp
        await document.save({ transaction: t })

        sendJSONresponse(res, 200, { status: 'OK', payload: document, message: 'Documento actualizado correctamente' })
        return
    })
}

module.exports.deteleDocument = (req, res) => {

    const documentId = req.params.documentId

    if (!documentId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const document = await RequiredDocument.findOne({
            where: {
                id: documentId
            },
            transaction: t
        })

        if (!document) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Required document not found' })
            return
        }

        await RequiredDocument.destroy({
            where: {
                id: documentId
            },
            limit: 1,
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', message: 'Documento eliminado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}