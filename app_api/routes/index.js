const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')


// middlewares
const auth = jwt({ secret: process.env.JWT_SECRET, algorithms: ['RS256'] })
const userAuth = require('../middlewares/user').userAuth
const adminAuth = require('../middlewares/admin').adminAuth

// Controllers
const sepomexController = require('../controllers/sepomex')
const testController = require('../controllers/test')

// TEST
router.get('/test/sms/:phone', testController.sendSMS)
router.get('/test/email/:email', testController.sendEmail)

// SEPOMEX
router.get('/sepomex/getAddresses/:postalCode', sepomexController.getAddressesByPostalCode)

// ADMIN
router.get('/admin/sepomex', sepomexController.importSepomexCatalogFromXLM)


module.exports = router