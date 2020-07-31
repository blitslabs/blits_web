const User = require('../models/sequelize').User
const UserLocation = require('../models/sequelize').UserLocation
const Ride = require('../models/sequelize').Ride
const sequelize = require('../models/sequelize').sequelize
const { Op } = require('sequelize')
const moment = require('moment')
const crypto = require('crypto')
const fs = require('fs')

const sendJSONresponse = require('../../utils/index').sendJSONresponse


module.exports.getGlobalMapData = (req, res) => {
    sequelize.transaction(async (t) => {
        let users = User.findAll({
            where: {
                accountType: 'USER',
                lastLat: { $not: null },
                lastLng: { $not: null }
            }, 
            transaction: t
        })
        let drivers = User.findAll({
            where: {
                accountType: 'DRIVER',
                lastLat: { $not: null },
                lastLng: { $not: null }
            },
            transaction: t
        })        
        let activeRides = Ride.findAll({
            where: {
                status: 'ONGOING',
            },
            include: [
                { model: User },
                { model: User, as: 'driver', },
            ],            
            limit: 20,
            transaction: t
        })
        let completedRides = Ride.findAll({
            where: {
                status: 'COMPLETED'
            },
            include: [
                { model: User },
                { model: User, as: 'driver', },
            ],            
            limit: 20,
            transaction: t
        })

        const [u, d, a, c] = await Promise.all([users, drivers, activeRides, completedRides])
        
        const payload = {
            users: [...u],
            drivers: [...d],
            activeRides: [...a],
            completedRides: [...c]
        }
        sendJSONresponse(res, 200, { status: 'OK', payload })
        return
    })  
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la operación'})
            return
        })
}

module.exports.saveUserLocation = (req, res) => {

}

module.exports.getLastUserLocation = (req, res) => {

}

module.exports.getUserLocations = (req, res) => {

}

module.exports.getService = (req, res) => {

}



