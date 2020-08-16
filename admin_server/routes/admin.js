const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')

const adminController = require('../controllers/admin')

router.get('/', adminController.renderApp)
router.get('/app/*', adminController.renderApp)
router.get('/admin/*', adminController.renderApp)

module.exports = router