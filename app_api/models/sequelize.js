const Sequelize = require('sequelize')
const AuthRequestModel = require('./authRequest')
const UserModel = require('./user')
const ServiceVehicleModel = require('./serviceVehicle')
const UserLocationModel = require('./userLocation')
const ReviewModel = require('./review')
const DocumentModel = require('./document')
const RequiredDocumentModel = require('./requiredDocument')
const BalanceModel = require('./balance')
const PictureModel = require('./picture')
const RideModel = require('./ride')
const TransactionModel = require('./transaction')
const PaymentMethodModel = require('./paymentMethod')
const ZoneModel = require('./zone')
const ZonePointModel = require('./zonePoint')
const BusinessSettingsModel = require('./businessSettings')
const ServiceFareModel = require('./serviceFare')
const LostItemModel = require('./lostItem')
const PaymentSettingsModel = require('./paymentSettings')
const CurrencyModel = require('./currency')
const PromoCodeModel = require('./promoCode')
const PromoCodeTxModel = require('./promoCodeTxs')
const UserPromoCodeModel = require('./userPromoCode')
const RewardRuleModel = require('./rewardRule')
const RewardTxModel = require('./rewardTxs')
const ReferralRuleModel = require('./referralRule')
const ReferralTxModel = require('./referralTxs')
const RegistrationKeyModel = require('./registrationKeys')
const PushNotificationModel = require('./pushNotification')
const UserVehicleModel = require('./userVehicle')
const SupportTicketModel = require('./supportTicket')
const AccountModel = require('./account')
const WithdrawRequestModel = require('./withdrawRequest')
const VehicleMappingModel = require('./vehicleMapping')
const AdminPermissionModel = require('./adminPermission')


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
)

const AuthRequest = AuthRequestModel(sequelize, Sequelize)
const User = UserModel(sequelize, Sequelize)
const ServiceVehicle = ServiceVehicleModel(sequelize, Sequelize)
const UserLocation = UserLocationModel(sequelize, Sequelize)
const Review = ReviewModel(sequelize, Sequelize)
const Balance = BalanceModel(sequelize, Sequelize)
const RequiredDocument = RequiredDocumentModel(sequelize, Sequelize)
const Document = DocumentModel(sequelize, Sequelize)
const Picture = PictureModel(sequelize, Sequelize)
const Ride = RideModel(sequelize, Sequelize)
const Transaction = TransactionModel(sequelize, Sequelize)
const PaymentMethod = PaymentMethodModel(sequelize, Sequelize)
const Zone = ZoneModel(sequelize, Sequelize)
const ZonePoint = ZonePointModel(sequelize, Sequelize)
const BusinessSettings = BusinessSettingsModel(sequelize, Sequelize)
const ServiceFare = ServiceFareModel(sequelize, Sequelize)
const LostItem = LostItemModel(sequelize, Sequelize)
const PaymentSettings = PaymentSettingsModel(sequelize, Sequelize)
const Currency = CurrencyModel(sequelize, Sequelize)
const PromoCode = PromoCodeModel(sequelize, Sequelize)
const PromoCodeTx = PromoCodeTxModel(sequelize, Sequelize)
const UserPromoCode = UserPromoCodeModel(sequelize, Sequelize)
const RewardRule = RewardRuleModel(sequelize, Sequelize)
const RewardTx = RewardTxModel(sequelize, Sequelize)
const ReferralRule = ReferralRuleModel(sequelize, Sequelize)
const ReferralTx = ReferralTxModel(sequelize, Sequelize)
const RegistrationKey = RegistrationKeyModel(sequelize, Sequelize)
const PushNotification = PushNotificationModel(sequelize, Sequelize)
const UserVehicle = UserVehicleModel(sequelize, Sequelize)
const SupportTicket = SupportTicketModel(sequelize, Sequelize)
const Account = AccountModel(sequelize, Sequelize)
const WithdrawRequest = WithdrawRequestModel(sequelize, Sequelize)
const VehicleMapping = VehicleMappingModel(sequelize, Sequelize)
const AdminPermission = AdminPermissionModel(sequelize, Sequelize)

AuthRequest.belongsTo(User)
User.hasMany(UserLocation)
UserLocation.belongsTo(User)
User.hasMany(Review)
Review.belongsTo(User)
Balance.belongsTo(User)
User.hasMany(Balance)
User.hasMany(Ride)
Ride.belongsTo(User)
Ride.belongsTo(User, {
    as: 'driver',
    foreignKey: 'driverId'
})
Ride.hasOne(Transaction)
Transaction.belongsTo(PaymentMethod)
PaymentMethod.hasMany(Transaction)
Zone.hasMany(ZonePoint)
Review.belongsTo(User)
Review.belongsTo(User, {
    as: 'driver',
    foreignKey: 'driverId'
})
User.hasMany(Transaction)
Transaction.belongsTo(User)
Transaction.belongsTo(User, {
    as: 'driver',
    foreignKey: 'driverId'
})
LostItem.belongsTo(User)
PromoCode.belongsTo(Zone)
PromoCodeTx.belongsTo(User)
UserPromoCode.belongsTo(User)
UserPromoCode.belongsTo(PromoCode)
RewardTx.belongsTo(User)
RewardTx.belongsTo(Ride)
ReferralTx.belongsTo(User)
ReferralTx.belongsTo(Ride)
Document.belongsTo(User)
User.hasMany(Document)
UserVehicle.belongsTo(User)
UserVehicle.belongsTo(ServiceVehicle)
SupportTicket.belongsTo(User)
Account.belongsTo(User)
WithdrawRequest.belongsTo(User)
WithdrawRequest.belongsTo(Account)
VehicleMapping.belongsTo(ServiceVehicle)
VehicleMapping.belongsTo(ServiceFare)
VehicleMapping.belongsTo(Zone)
AdminPermission.belongsTo(User)
User.hasOne(AdminPermission)

sequelize
    .query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
    .then(() => {
        sequelize.sync({ force: false })
            .then(() => {
                console.log('Database & tables created')
            })
    })

module.exports = {
    AuthRequest,
    User,
    ServiceVehicle,
    UserLocation,
    Document,
    RequiredDocument,
    Balance,
    Picture,
    Ride,
    Transaction,
    PaymentMethod,
    Zone,
    ZonePoint,
    Review,
    BusinessSettings,
    ServiceFare,
    LostItem,
    PaymentSettings,
    Currency,
    PromoCode,
    PromoCodeTx,
    UserPromoCode,
    RewardRule,
    RewardTx,
    ReferralRule,
    ReferralTx,
    RegistrationKey,
    PushNotification,
    UserVehicle,
    SupportTicket,
    Account,
    WithdrawRequest,
    VehicleMapping,
    AdminPermission,
    sequelize,
}