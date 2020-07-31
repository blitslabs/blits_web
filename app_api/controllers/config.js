const Currency = require('../models/sequelize').Currency
const BusinessSettings = require('../models/sequelize').BusinessSettings
const PaymentSettings = require('../models/sequelize').PaymentSettings
const PaymentMethod = require('../models/sequelize').PaymentMethod
const ServiceVehicle = require('../models/sequelize').ServiceVehicle
const Ride = require('../models/sequelize').Ride
const Transaction = require('../models/sequelize').Transaction

const Country = require('../models/sequelize').Country
const State = require('../models/sequelize').State
const City = require('../models/sequelize').City
let csc = require('country-state-city').default
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse

module.exports.initialSetup = (req, res) => {
    sequelize.transaction(async (t) => {

        // Insert Currencies
        const currencies = [
            { name: 'Pesos Mexicanos', symbol: 'MXN' },
            { name: 'Dólares Americanos', symbol: 'USD' }
        ]

        for (let currency of currencies) {
            await Currency.create({
                name: currency.name, symbol: currency.symbol
            }, { transaction: t })
        }

        // Insert Business Settings
        await BusinessSettings.create({
            businessName: 'Bipp',
            copyrightContent: '© 2020 Bipp',
            playStoreUserApp: 'https://play.google.com/store?hl=en',
            playStoreDriverApp: 'https://play.google.com/store?hl=en',
            appStoreUserApp: 'https://www.apple.com/ios/app-store/',
            appStoreDriverApp: 'https://www.apple.com/ios/app-store/',
            distanceUnit: 'Km',
            waitingTimeOut: 10,
            providerSearchRadius: 20,
            emergencyNumber: 911,
            contactNumber: 5512345678,
            email: 'test@contact.com',
            scheduleTriggerTime: 5,
            driverPhoneValidation: 'ACTIVE',
            driverEmailValidation: 'ACTIVE',
            userPhoneValidation: 'ACTIVE',
            userEmailValidation: 'ACTIVE',
            rideCancellationTime: 5,
            rideCancellationCharges: 20,
            allowChat: 'ACTIVE',
            socialLoginUser: 'ACTIVE',
            socialLoginDriver: 'ACTIVE'
        }, { transaction: t })


        // Insert Payment Settings
        await PaymentSettings.create({
            dailyTarget: 50,
            taxPercentage: 16,
            surgeTriggerPoint: 50,
            surgePercentage: 25,
            comissionPercentage: 40,
            currency: 'MXN',
            bookingIdPrefix: 'BIPP'
        }, { transaction: t })


        // Insert Payment Methods
        const paymentMethods = [
            { name: 'Efectivo', code: 'CASH', description: 'Pago en efectivo' },
            { name: 'Paypal', code: 'PAYPAL', description: 'Pago con Paypal' }
        ]

        for (let m of paymentMethods) {
            await PaymentMethod.create({
                name: m.name,
                code: m.code,
                description: m.description,
            })
        }


        // Insert Demo Service Vehicles
        const serviceVehicles = [
            { vehicleName: 'Demo X', seatCapacity: 2, baseFare: 10, distanceFare: 2, description: 'Demo X description', pictureId: 1 }
        ]

        for (let v of serviceVehicles) {
            await ServiceVehicle.create({
                vehicleName: v.vehicleName,
                seatCapacity: v.seatCapacity,
                baseFare: v.baseFare,
                distanceFare: v.distanceFare,
                description: v.description,
                pictureId: v.pictureId
            })
        }

        // Insert Demo Rides and Transactions
        for (let i = 0; i < 5; i++) {
            if (i === 0) {
                const ride = await Ride.create({
                    userId: 2,
                    driverId: 3,
                    serviceVehicleId: 1,
                    startLat: 19.3611458,
                    startLng: -99.1717888,
                    endLat: 19.3353624,
                    endLng: -99.1593727,
                    status: 'COMPLETED'
                })
                await Transaction.create({
                    userId: 2,
                    driverId: 3,
                    rideId: ride.id,
                    operation: 'RIDE_PAYMENT',
                    paymentMethodId: 1,
                    currency: 'MXN',
                    baseFare: 10,
                    ditanceFare: 2,
                    total: 48,
                    comission: 19.2,
                    status: 'COMPLETED'
                })
            } else {
                const ride = await Ride.create({
                    userId: 2,
                    driverId: 3,
                    serviceVehicleId: 1,
                    startLat: parseFloat(19.3611458) + parseFloat(Math.random().toFixed(6)),
                    startLng: parseFloat(-99.1717888) + parseFloat(Math.random().toFixed(6)),
                    endLat: parseFloat(19.3353624) + parseFloat(Math.random().toFixed(6)),
                    endLng: parseFloat(-99.1593727) + parseFloat(Math.random().toFixed(6)),
                    status: 'COMPLETED'
                })
                await Transaction.create({
                    userId: 2,
                    driverId: 3,
                    rideId: ride.id,
                    operation: 'RIDE_PAYMENT',
                    paymentMethodId: 1,
                    currency: 'MXN',
                    baseFare: 10,
                    ditanceFare: 2,
                    total: 48,
                    comission: 19.2,
                    status: 'COMPLETED'
                })
            }
        }


        // Insert countries and states
        // const countries = csc.getAllCountries()

        // for (let c of countries) {
        //     await Country.findOrCreate({
        //         where: {
        //             name: c.name
        //         },
        //         defaults: {
        //             id: c.id,
        //             name: c.name,
        //             shortname: c.sortname,
        //             phonecode: c.phonecode
        //         },
        //         transaction: t
        //     })

        //     let states = csc.getStatesOfCountry(c.id)

        //     for (let s of states) {
        //         await State.findOrCreate({
        //             where: {
        //                 name: c.name,
        //                 countryId: c.id
        //             },
        //             defaults: {
        //                 id: s.id,
        //                 name: s.name,
        //                 countryId: c.id,
        //             },
        //             transaction: t
        //         })

        //         // let cities = csc.getCitiesOfState(s.id)

        //         // for (let city of cities) {
        //         //     try {
        //         //         await City.findOrCreate({
        //         //             where: {
        //         //                 name: city.name,
        //         //                 stateId: s.id,
        //         //             },
        //         //             defaults: {
        //         //                 id: city.id,
        //         //                 name: city.name,
        //         //                 stateId: s.id
        //         //             }
        //         //         })
        //         //     } catch(err) {
        //         //         continue
        //         //     }
        //         // }
        //     }
        // }

        sendJSONresponse(res, 200, { status: 'OK', message: 'Initial configuration completed' })
        return
    })
        .catch(function (err) {
            console.log(err)
            sendJSONresponse(res, 404, { message: 'Error al intentar realizar la operación' })
            return
        })
}