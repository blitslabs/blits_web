const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')


// middlewares
const auth = jwt({ secret: process.env.JWT_SECRET, algorithms: ['RS256'] })
const userAuth = require('../middlewares/user').userAuth
const adminAuth = require('../middlewares/admin').adminAuth

// Controllers
const authController = require('../controllers/auth')
const userController = require('../controllers/user')
const adminController = require('../controllers/admin')
const balanceController = require('../controllers/balance')
const requiredDocumentController = require('../controllers/requiredDocument')
const serviceVehicleController = require('../controllers/serviceVehicle')
const pictureController = require('../controllers/picture')
const rideController = require('../controllers/ride')
const zoneController = require('../controllers/zone')
const reviewController = require('../controllers/review')
const configController = require('../controllers/config')
const txController = require('../controllers/transactions')
const settingsController = require('../controllers/settings')
const paymentSettingsController = require('../controllers/paymentSettings')
const serviceFareController = require('../controllers/serviceFare')
const lostItemController = require('../controllers/lostItem')
const currencyController = require('../controllers/currency')
const promoCodeController = require('../controllers/promoCode')
const promoCodeTxController = require('../controllers/promoCodeTxs')
const rewardRuleController = require('../controllers/rewardRule')
const rewardsController = require('../controllers/rewards')
const referralRuleController = require('../controllers/referralRule')
const referralController = require('../controllers/referral')
const pushNotificatinController = require('../controllers/pushNotification')
const documentController = require('../controllers/document')
const userVehicleController = require('../controllers/userVehicle')
const supportTicketController = require('../controllers/supportTicket')
const userLocationController = require('../controllers/userLocation')
const accountController = require('../controllers/account')
const withdrawRequestController = require('../controllers/withdrawRequest')
const dashboardController = require('../controllers/dashboard')
const vehicleMappingController = require('../controllers/vehicleMapping')

// Routes
// Authentication
router.post('/signup', authController.signup)
router.post('/auth/verifyPhone', authController.verifyPhone)
router.post('/login', authController.login)
router.post('/auth/facebook', authController.facebookAuth)
router.post('/auth/google', authController.googleAuth)

// Users
router.get('/user/:userId', auth, userController.getUserDetails)
router.put('/admin/user', [auth, adminAuth], userController.updateUserDetails)
router.put('/admin/user/password', [auth, adminAuth], userController.changePassword)
router.post('/admin/user', [auth, adminAuth], userController.createUser)
router.delete('/admin/user/:userId', [auth, adminAuth], userController.deleteUser)
router.put('/admin/user/status', [auth, adminAuth], userController.updateUserStatus)



// Balances
router.get('/balance/:currency', [auth, userAuth], balanceController.getBalance)


// Required Documents
router.get('/requiredDocuments', auth, requiredDocumentController.getAllRequiredDocuments)
router.get('/requiredDocumentsByAccountType/:accountType', auth, requiredDocumentController.getAllRequiredDocumentsByAccountType)
router.get('/requiredDocument/:documentId', auth, requiredDocumentController.getDocumentDetails)
router.post('/admin/requiredDocument', [auth, adminAuth], requiredDocumentController.createRequiredDocument)
router.put('/admin/requiredDocument', [auth, adminAuth], requiredDocumentController.updateRequiredDocument)
router.delete('/admin/requiredDocument/:documentId', [auth, adminAuth], requiredDocumentController.deteleDocument)

// Documents
router.get('/admin/user/:userId/documents', [auth, adminAuth], documentController.getUserDocuments)
router.get('/admin/document/:documentId', [auth, adminAuth], documentController.getDocument)
router.put('/admin/document/:documentId', [auth, adminAuth], documentController.updateDocument)
router.put('/admin/document/:documentId/status', [auth, adminAuth], documentController.updateDocumentStatus)
// User => Document Status
router.put('/admin/user/documentsStatus', [auth, adminAuth], userController.updateDriverDocumentsStatus)

// Service Vehicle
router.get('/serviceVehicles', auth, serviceVehicleController.getAllServiceVehicles)
router.get('/serviceVehicle/:vehicleId', auth, serviceVehicleController.getVehicleDetails)
router.post('/admin/serviceVehicle', [auth, adminAuth], serviceVehicleController.createServiceVehicle)
router.put('/admin/serviceVehicle', [auth, adminAuth], serviceVehicleController.updateServiceVehicle)
router.delete('/admin/serviceVehicle/:vehicleId', [auth, adminAuth], serviceVehicleController.deteleServiceVehicle)

// User Vehicles
router.get('/userVehicle/:userId', auth, userVehicleController.getUserVehicle)
router.put('/admin/userVehicle/', [auth, adminAuth], userVehicleController.updateUserVehicle)
router.delete('/admin/userVehicle/:userVehicleId', [auth, adminAuth], userVehicleController.deleteUserVehicle)

// Rides
router.get('/ride/:rideId', auth, rideController.getRideDetails)
router.get('/admin/rides/:status?/:page?', [auth, adminAuth], rideController.getAllRidesByStatusAndPage)
router.get('/admin/ridesByDateRange/:status/:startDate/:endDate/:page?', [auth, adminAuth], rideController.getAllRidesByStatusAndDateRangeAndPage)
router.delete('/admin/ride/:rideId', [auth, adminAuth], rideController.deleteRide)
router.put('/admin/ride/:rideId/', [auth, adminAuth], rideController.updateRideDetails)
router.get('/userRides/:userId/:page?', auth, rideController.getUserRidesByPage)


// Zones
router.get('/zones', auth, zoneController.getAllZones)
router.get('/zone/:zoneId', auth, zoneController.getZoneDetails)
router.post('/admin/zone', [auth, adminAuth], zoneController.createZone)
router.put('/admin/zone', [auth, adminAuth], zoneController.updateZone)
router.delete('/admin/zone/:zoneId', [auth, adminAuth], zoneController.deleteZone)

// Review
router.get('/reviews/:reviewType/:page?', auth, reviewController.getAllReviews)
router.get('/review/:reviewId', auth, reviewController.getReviewDetails)
router.post('/review', auth, reviewController.createReview)
router.delete('/admin/review/:reviewId', [auth, adminAuth], reviewController.deleteReview)

// Service Fare Plan Settings
router.get('/serviceFarePlan/:serviceFareId', auth, serviceFareController.getServiceFarePlan)
router.get('/serviceFarePlans', auth, serviceFareController.getAllServiceFarePlans)
router.post('/admin/serviceFarePlan', [auth, adminAuth], serviceFareController.createNewServiceFarePlan)
router.put('/admin/serviceFarePlan', [auth, adminAuth], serviceFareController.updateServiceFarePlan)
router.delete('/admin/serviceFarePlan/:serviceFareId', [auth, adminAuth], serviceFareController.deleteServiceFarePlan)

// Lost Items
router.get('/admin/lostItems', [auth, adminAuth], lostItemController.getAllLostItems)
router.get('/lostItem/:lostItemId', auth, lostItemController.getLostItemDetails)
router.post('/admin/lostItem', auth, lostItemController.createLostItem)
router.put('/admin/lostItem', auth, lostItemController.updateLostItem)
router.delete('/admin/lostItem/:lostItemId', [auth, adminAuth], lostItemController.deleteLostItem)

// Promo Codes
router.get('/admin/promoCodes', [auth, adminAuth], promoCodeController.getAllPromoCodes)
router.get('/promoCode/:promoCodeId', auth, promoCodeController.getPromoCodeDetails)
router.post('/admin/promoCode', [auth, adminAuth], promoCodeController.createPromoCode)
router.put('/admin/promoCode', [auth, adminAuth], promoCodeController.updatePromoCode)
router.delete('/admin/promoCode/:promoCodeId', [auth, adminAuth], promoCodeController.deletePromoCode)

// Promo Code Tx
router.get('/admin/promoCodeTxs/:code?/:page?', [auth, adminAuth], promoCodeTxController.getAllPromoCodeTxsByCodeAndPage)

// Txs
router.get('/admin/txs/:page?', [auth, adminAuth], txController.getAllTxsByPage)
router.get('/driver/:userId/stats', auth, txController.getDriverStats)
router.get('/admin/global/stats/:period', [auth, adminAuth], txController.getGlobalStatsByPeriod)
router.get('/admin/global/statsByRange/:startDate/:endDate', [auth, adminAuth], txController.getGlobalStatsByRange)

// Accounts
router.get('/admin/accounts/:status/:page?', [auth, adminAuth], accountController.getAllAccountsByStatusAndPage)
router.get('/account/:accountId', auth, accountController.getAccountDetails)
router.post('/account', auth, accountController.createAccount)
router.put('/admin/account', [auth, adminAuth], accountController.updateAccount)
router.put('/admin/account/:accountId/status', [auth, adminAuth], accountController.approveAccount)
router.delete('/admin/account/:accountId', [auth, adminAuth], accountController.deleteAccount)

// Withdraw Requests
router.get('/withdrawRequest/:requestId', auth, withdrawRequestController.getWithdrawRequestDetails)
router.get('/admin/withdrawRequests/:status/:page?', [auth, adminAuth], withdrawRequestController.getWithdrawByStatusAndPage)
router.put('/admin/withdrawRequest/:requestId/status', [auth, adminAuth], withdrawRequestController.approveWithdrawRequest)
router.get('/admin/approveAllWithdrawRequests', [auth, adminAuth], withdrawRequestController.approveAllWithdrawRequests)

// Picture
router.get('/picture/:pictureId', pictureController.getPicture)

// Admin
router.post('/admin/login', adminController.adminLogin)
router.get('/admin/checkPrivileges', [auth], adminController.checkPrivileges)


// Admin => Settings
router.get('/admin/settings/business', [auth, adminAuth], settingsController.getBusinessSettings)
router.post('/admin/settings/business', [auth, adminAuth], settingsController.updateBusinessSettings)

// Admin => Payment Settings
router.get('/admin/settings/payment', [auth, adminAuth], paymentSettingsController.getPaymentSettings)
router.post('/admin/settings/payment', [auth, adminAuth], paymentSettingsController.updatePaymentSettings)

// Admin => Currencies
router.get('/currencies', auth, currencyController.getAllCurrencies)
router.post('/currency', [auth, adminAuth], currencyController.addCurrency)
router.delete('/currency/:symbol', [auth, adminAuth], currencyController.deleteCurrency)

// Admin => Reward Rule
router.get('/admin/rewardRule', auth, rewardRuleController.getRewardRule)
router.put('/admin/rewardRule', [auth, adminAuth], rewardRuleController.updateRewardRule)

// Admin => Rewards
router.get('/admin/rewardTxs/:page?', [auth, adminAuth], rewardsController.getAllRewardTxsByPage)

// Admin => Referral Rule
router.get('/admin/referralRule', [auth, adminAuth], referralRuleController.getReferralRule)
router.put('/admin/referralRule', [auth, adminAuth], referralRuleController.updateReferralRule)

// Admin => Referral
router.get('/admin/referralTxs/:page?', [auth, adminAuth], referralController.getAllReferralTxsByPage)

// Admin => Push Notifications
router.get('/admin/pushNotifications/:page?', [auth, adminAuth], pushNotificatinController.getAllNotificationsByPage)
router.post('/admin/pushNotification', [auth, adminAuth], pushNotificatinController.createPushNotification)
router.delete('/admin/pushNotification/:notificationId', [auth, adminAuth], pushNotificatinController.deletePushNotification)

// Admin => Support Tickets
router.get('/admin/supportTickets/:status/:page?', [auth, adminAuth], supportTicketController.getSupportTicketsByStatusAndPage)
router.get('/supportTicket/:ticketId', auth, supportTicketController.getSupportTicketDeatils)
router.put('/admin/supportTicket', [auth, adminAuth], supportTicketController.updateSupportTicket)
router.delete('/admin/supportTicket/:ticketId', [auth, adminAuth], supportTicketController.deleteSupportTicket)

// Admin => User Locations
router.get('/admin/globalMap', auth, userLocationController.getGlobalMapData)

// Admin => Vehicle Mappings
router.get('/admin/vehicleMappings', [auth, adminAuth], vehicleMappingController.getAllVehicleMappings)
router.get('/admin/vehicleMapping/:vehicleMappingId', [auth, adminAuth], vehicleMappingController.getVehicleMappingDetails)
router.post('/admin/vehicleMapping', [auth, adminAuth], vehicleMappingController.createVehicleMapping)
router.put('/admin/vehicleMapping', [auth, adminAuth], vehicleMappingController.updateVehicleMapping)
router.delete('/admin/vehicleMapping/:vehicleMappingId', [auth, adminAuth], vehicleMappingController.deleteVehicleMapping)

// Admin => Wallets
router.get('/admin/wallets/:accountType/:page?', [auth, adminAuth], balanceController.getAllUserBalancesByAccountTypeAndPage)
router.get('/admin/wallet/:userId', [auth, adminAuth], balanceController.getUserWallet)

// Admin => Config
router.get('/admin/initialSetup', configController.initialSetup)

// Admin => Users
router.get('/admin/getAllUsersByTypeAndPage/:accountType/:page?', [auth, adminAuth], userController.getAllUsersByTypeAndPage)
router.get('/admin/users/stats', [auth, adminAuth], userController.getUsersStats)
router.get('/admin/drivers/stats', [auth, adminAuth], userController.getDriversStats)

// Admin => Dashboard
router.get('/admin/dashboard/data', [auth, adminAuth], dashboardController.getDashboardData)
router.get('/admin/user', [auth, adminAuth], adminController.getAdminData)

// Admin => AdminUsers
router.get('/admin/permissions', [auth, adminAuth], adminController.getAdminPermissions)
router.get('/admin/adminusers', [auth, adminAuth], adminController.getAdminUsers)
router.get('/admin/adminuser/:userId', [auth, adminAuth], adminController.getAdminUser)
router.post('/admin/adminuser', [auth, adminAuth], adminController.createAdminUser)
router.put('/admin/adminuser', [auth, adminAuth], adminController.updateAdminUserPermissions)
router.delete('/admin/adminuser/:userId', [auth, adminAuth], adminController.deleteAdminUser)

module.exports = router