const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')


// middlewares
const auth = jwt({ secret: process.env.JWT_SECRET })

// controllers
const newsletterController = require('../controllers/newsletter')
const loanController = require('../controllers/loan')
const assetController = require('../controllers/asset')
const contractController = require('../controllers/contract')

// loan
router.get('/loans/:state?', loanController.getLoansByStatus)

// asset
router.get('/assets/savePrices', assetController.saveAssetPrices)
router.get('/assets', assetController.getAssets)

// loans
router.post('/loan', loanController.saveLoan)
router.put('/loan/saveExtLoanId', loanController.saveLoanId)
router.get('/loans/:account/:userType/:loanState?', loanController.getLoans)
router.put('/loan/updateLoanState', loanController.updateLoanState)

// contract
router.get('/contract/abi/:contractName', contractController.getABIByContractName)
router.get('/contracts', contractController.getContracts)

// newsletter
router.post('/newsletter/subscribe', newsletterController.subscribeEmail)

module.exports = router