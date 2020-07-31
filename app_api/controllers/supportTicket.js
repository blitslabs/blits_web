const User = require('../models/sequelize').User
const SupportTicket = require('../models/sequelize').SupportTicket
const sequelize = require('../models/sequelize').sequelize
const crypto = require('crypto')
const fs = require('fs')
const sendJSONresponse = require('../../utils/index').sendJSONresponse


module.exports.getSupportTicketsByStatusAndPage = (req, res) => {
    console.log('test')
    const status = req.params.status
    const page = req.params.page ? parseInt(req.params.page) : 1
    const limit = 50
    let offset = 50


    if (!status || !page || page <= 0) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        let results, tickets, pages

        results = await SupportTicket.findAndCount({
            where: {
                status,
            },
            transaction: t
        })

        pages = Math.ceil(results.count / limit)
        offset = limit * (page - 1)

        tickets = await SupportTicket.findAll({
            where: {
                status,
            },
            include: [
                { model: User }
            ],
            limit,
            offset,
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: tickets })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getSupportTicketDeatils = (req, res) => {
    const ticketId = req.params.ticketId

    if (!ticketId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const ticket = await SupportTicket.findOne({
            where: {
                id: ticketId,
            },
            include: [
                { model: User }
            ],
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: ticket })
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la acción' })
            return
        })
}

module.exports.updateSupportTicket = (req, res) => {
    const ticketId = req.body.ticketId
    const topic = req.body.topic
    const status = req.body.status
    const reply = req.body.reply

    if (!ticketId || !topic || !status || !reply) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const ticket = await SupportTicket.update({
            topic, status, reply,
        }, {
            where: {
                id: ticketId
            },
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: ticket, message: 'Ticket actualizado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la acción' })
            return
        })
}

module.exports.deleteSupportTicket = (req, res) => {
    const ticketId = req.params.ticketId

    if (!ticketId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        await SupportTicket.destroy({
            where: {
                id: ticketId,
            },
            limit: 1,
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', message: 'Ticket eliminado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la acción' })
            return
        })
}