const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')


// middlewares
const auth = jwt({ secret: process.env.JWT_SECRET })
const userAuth = require('../middlewares/user').userAuth
const adminAuth = require('../middlewares/admin').adminAuth

// Controllers
const preCreditRequest = require('../controllers/preCreditRequest')
const sepomexController = require('../controllers/sepomex')
const testController = require('../controllers/test')
const circuloCreditoController = require('../controllers/circuloCredito')
const creditReportController = require('../controllers/creditReport')
const adminController = require('../controllers/admin')
const authController = require('../controllers/auth')

// Authentication
router.post('/auth/login', authController.login)
router.post('/auth/signup', authController.signup)

// precalificador
router.post('/precalificador/creditRequest', preCreditRequest.createPreCreditRequest)

// Credit Report
router.get('/creditReport/pdf/:creditReportId', creditReportController.getCreditReportPDF)

// Circulo de credito
router.get('/circuloCredito/precalificador/:preCreditRequestHash', circuloCreditoController.getReporteCreditoConsolidadoPrecalificador)

// SEPOMEX
router.get('/sepomex/getAddresses/:postalCode', sepomexController.getAddressesByPostalCode)

// ADMIN
router.get('/admin/sepomex', sepomexController.importSepomexCatalogFromXLM)
router.post('/admin/setAdminKeys', auth, adminController.setAdminKeys)
router.post('/admin/signupFirstAccount', adminController.adminSignup)

// TEST
router.get('/test/sms/:phone', testController.sendSMS)
router.get('/test/email/:email', testController.sendEmail)
router.get('/test/whatsapp/:phone', testController.sendWhatsapp)
router.get('/test/whatsapp_credit_response/:phone', testController.sendWACreditResponse)
router.get('/test/sheets', testController.googleSheets)

module.exports = router