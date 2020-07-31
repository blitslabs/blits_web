const User = require('../models/sequelize').User
const Ride = require('../models/sequelize').Ride
const Review = require('../models/sequelize').Review
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse



module.exports.getAllReviews = (req, res) => {
    const reviewType = req.params.reviewType
    const page = req.params.page ? parseInt(req.params.page) : 1
    const limit = 50
    let offset = 0

    if (!page || page <= 0 || !reviewType) {
        sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {

        let results, reviews, pages

        results = await Review.findAndCount({ transaction: t })

        pages = Math.ceil(results.count / limit)
        offset = limit * (page - 1)

        reviews = await Review.findAll({
            include: [
                { model: User },
                { model: User, as: 'driver' },
            ],
            where: {
                reviewType
            },
            limit,
            offset,
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: reviews, count: results.count, pages: pages })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getReviewDetails = (req, res) => {

    const reviewId = req.params.reviewId

    sequelize.transaction(async (t) => {
        const review = await Review.findOne({
            where: {
                id: reviewId
            },
            transaction: t
        })

        if (!document) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Review not found' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: review })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.createReview = (req, res) => {
    const fromUserId = req.user.id
    const rideId = req.body.rideId
    const rating = req.body.rating
    const comments = req.body.comments
    const reviewType = req.body.reviewType

    if (!fromUserId || !rideId || !rating || !comments || !reviewType) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required parameters' })
        return
    }

    sequelize.transaction(async (t) => {
        

        let ride, review, created
        if (reviewType === 'USER_TO_DRIVER') {
            ride = await Ride.findOne({
                where: {
                    id: rideId,
                    userId: fromUserId,
                },
                transaction: t
            })
    
            if (!ride) {
                sendJSONresponse(res, 404, { status: 'ERROR', message: 'No se encontró el viaje seleccionado' })
                return
            }

            [review, created] = await Review.findOrCreate({
                where: {
                    rideId,
                    reviewType
                },
                defaults: {
                    userId: fromUserId,
                    driverId: ride.driverId,
                    rideId,
                    rating,
                    comments,
                    reviewType
                },
                transaction: t
            })
        } else if (reviewType === 'DRIVER_TO_USER') {
            ride = await Ride.findOne({
                where: {
                    id: rideId,
                    driverId: fromUserId,
                },
                transaction: t
            })
    
            if (!ride) {
                sendJSONresponse(res, 404, { status: 'ERROR', message: 'No se encontró el viaje seleccionado' })
                return
            }

            [review, created] = await Review.findOrCreate({
                where: {
                    rideId,
                    reviewType
                },
                defaults: {
                    userId: ride.userId,
                    driverId: fromUserId,
                    rideId,
                    rating,
                    comments,
                    reviewType
                }
            })
        }

        if(!created) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ya enviaste una reseña para este viaje'})
            return
        }

        if (!review) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'No fue posible guardar la reseña' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: document, message: 'Reseña creada correctamente' })
        return
    })
}

module.exports.deleteReview = (req, res) => {

    const reviewId = req.params.reviewId

    if (!reviewId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const review = await Review.findOne({
            where: {
                id: reviewId
            },
            transaction: t
        })

        if (!review) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Review not found' })
            return
        }

        await Review.destroy({
            where: {
                id: reviewId
            },
            limit: 1,
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', message: 'Reseña eliminada correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}