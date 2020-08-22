const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')


// middlewares
const auth = jwt({ secret: process.env.JWT_SECRET })

// controllers
const newsletterController = require('../controllers/newsletter')
const loanController = require('../controllers/loan')

// loan
router.get('/loans/:state?', loanController.getLoansByStatus)




// newsletter
router.post('/newsletter/subscribe', newsletterController.subscribeEmail)

module.exports = router