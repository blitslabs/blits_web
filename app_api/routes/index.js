const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')


// middlewares
const auth = jwt({ secret: process.env.JWT_SECRET, algorithms: ['RS256'] })
const userAuth = require('../middlewares/user').userAuth
const adminAuth = require('../middlewares/admin').adminAuth

// Controllers
const preCreditRequest = require('../controllers/preCreditRequest')
const sepomexController = require('../controllers/sepomex')
const testController = require('../controllers/test')
const circuloCreditoController = require('../controllers/circuloCredito')
const creditReportController = require('../controllers/creditReport')

// TEST
router.get('/test/sms/:phone', testController.sendSMS)
router.get('/test/email/:email', testController.sendEmail)
router.get('/test/whatsapp/:phone', testController.sendWhatsapp)
router.get('/test/whatsapp_credit_response/:phone', testController.sendWACreditResponse)

// precalificador
router.post('/precalificador/creditRequest', preCreditRequest.createPreCreditRequest)

// Credit Report
router.get('/creditReport/pdf/:creditReportId', creditReportController.getCreditReportPDF)

// circulo de credito
router.get('/circuloCredito/precalificador/:preCreditRequestId', circuloCreditoController.getReporteCreditoConsolidadoPrecalificador)


// SEPOMEX
router.get('/sepomex/getAddresses/:postalCode', sepomexController.getAddressesByPostalCode)

// ADMIN
router.get('/admin/sepomex', sepomexController.importSepomexCatalogFromXLM)


module.exports = router