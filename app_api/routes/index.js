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

// asset
router.get('/assets/savePrices', assetController.saveAssetPrices)
router.get('/assets', assetController.getAssets)

// loans
router.get('/loan/:loanId', loanController.getLoanDetails)
router.get('/loans/:state?', loanController.getLoansByStatus)
router.post('/loan', loanController.saveLoan)
router.put('/loan/saveExtLoanId', loanController.saveLoanId)
router.get('/loans/:account/:userType/:loanState?', loanController.getLoans)
router.put('/loan/updateLoanState', loanController.updateLoanState)
router.post('/loan/saveBorrower', loanController.saveBorrowerRequest)
router.get('/loan/approve/:loanId', loanController.assignBorrowerAndApprove)
router.get('/loanInBcoin/:bCoinLoanId', loanController.fetchLoanInBCoin)
router.get('/loan/acceptRepayment/:loanId', loanController.acceptRepayment)

// contract
router.get('/contract/abi/:contractName', contractController.getABIByContractName)
router.get('/contracts', contractController.getContracts)

// newsletter
router.post('/newsletter/subscribe', newsletterController.subscribeEmail)

module.exports = router