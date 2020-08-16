const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')


// middlewares
const auth = jwt({ secret: process.env.JWT_SECRET })


module.exports = router