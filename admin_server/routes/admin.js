const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')

const adminController = require('../controllers/admin')

router.get('/', adminController.renderHome)
router.get('/app/signup', adminController.renderExternalViews)
router.get('/app/login', adminController.renderExternalViews)
router.get('/app/*', adminController.renderApp)
router.get('/admin/*', adminController.renderApp)

module.exports = router