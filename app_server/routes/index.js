const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')

const appController = require('../controllers/app')

router.get('/', appController.renderHome)
router.get('/app/*', appController.renderApp)


module.exports = router