import React, { Component, Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

// Components
import withAdminAuth from '../withAdminAuth'
import AdminLogin from './AdminLogin'
import Dashboard from './Dashboard'
import Users from './Users'
import AddUser from './AddUser'
import EditUser from './EditUser'
import Drivers from './Drivers'
import EditDriver from './EditDriver'
import RequiredDocuments from './RequiredDocuments'
import EditRequiredDocument from './EditRequiredDocument'
import AddRequiredDocument from './AddRequiredDocument'
import ServiceVehicles from './ServiceVehicles'
import EditServiceVehicle from './EditServiceVehicle'
import AddServiceVehicle from './AddServiceVehicle'
import Rides from './Rides'
import Ride from './Ride'
import ScheduledRides from './ScheduledRides'
import ScheduledRide from './ScheduledRide'
import EditScheduledRide from './EditScheduledRide'
import Zones from './Zones'
import AddZone from './AddZone'
import Zone from './Zone'
import Reviews from './Reviews'
import Txs from './Txs'
import BusinessSettings from './BusinessSettings'
import FareSettings from './FareSettings'
import AddFarePlan from './AddFarePlan'
import EditServiceFare from './EditServiceFare'
import LostItems from './LostItems'
import LostItemDetails from './LostItemDetails'
import PaymentSettings from './PaymentSettings'
import PromoCodes from './PromoCodes'
import AddPromoCode from './AddPromoCode'
import EditPromoCode from './EditPromoCode'
import PromoCodeTxs from './PromoCodeTxs'
import RewardTxs from './RewardTxs'
import RewardRule from './RewardRule'
import ReferralTxs from './ReferralTxs'
import ReferralRule from './ReferralRule'
import PushNotifications from './PushNotifications'
import AddPushNotification from './AddPushNotification'
import DriverDocuments from './DriverDocuments'
import DocumentDetails from './DocumentDetails'
import EditDocument from './EditDocument'
import AddDriver from './AddDriver'
import UserRides from './UserRides'
import DriverFinance from './DriverFinance'
import SupportAgents from './SupportAgents'
import AddSupportAgent from './AddSupportAgent'
import SupportTickets from './SupportTickets'
import SupportTicketDetails from './SupportTicketDetails'
import LiveLocations from './LiveLocations'
import Revenue from './Revenue'
import EditAccount from './EditAccount'
import Accounts from './Accounts'
import WithdrawRequests from './WithdrawRequests'
import EditAdminProfile from './EditAdminProfile'
import VehicleMapping from './VehicleMapping'
import AddVehicleMapping from './AddVehicleMapping'
import EditVehicleMapping from './EditVehicleMapping'
import DriverVehicles from './DriverVehicles'
import Wallets from './Wallets'
import UserWallet from './UserWallet'
import AdminUsers from './AdminUsers'
import AddAdminUser from './AddAdminUser'
import EditAdminUser from './EditAdminUser'

class Admin extends Component {
    render() {
        const { match, auth } = this.props
        return (
            <Fragment>
                <Route path={match.path} exact component={AdminLogin} />
                <Route path={`${match.path}/login`} component={AdminLogin} />
                <PrivateRoute path={`${match.path}/dashboard`} component={Dashboard} auth={auth} />
                <PrivateRoute path={`${match.path}/users/:page?`} component={Users} auth={auth} />
                <PrivateRoute path={`${match.path}/user/:userId/edit`} component={EditUser} auth={auth} />
                <PrivateRoute path={`${match.path}/addUser`} component={AddUser} auth={auth} />
                <PrivateRoute path={`${match.path}/adminusers`} component={AdminUsers} auth={auth} />
                <PrivateRoute path={`${match.path}/addAdminUser`} component={AddAdminUser} auth={auth} />
                <PrivateRoute path={`${match.path}/adminuser/:userId/edit`} component={EditAdminUser} auth={auth} />
                <PrivateRoute path={`${match.path}/drivers/:page?`} component={Drivers} auth={auth} />
                <PrivateRoute path={`${match.path}/driver/:userId/edit`} component={EditDriver} auth={auth} />
                <PrivateRoute path={`${match.path}/driver/:userId/documents`} component={DriverDocuments} auth={auth} />
                <PrivateRoute path={`${match.path}/driver/:userId/vehicles`} component={DriverVehicles} auth={auth} />
                <PrivateRoute path={`${match.path}/addDriver`} component={AddDriver} auth={auth} />
                <PrivateRoute path={`${match.path}/document/:documentId`} exact component={DocumentDetails} auth={auth} />
                <PrivateRoute path={`${match.path}/document/:documentId/edit`} exact component={EditDocument} auth={auth} />
                <PrivateRoute path={`${match.path}/requiredDocuments`} component={RequiredDocuments} auth={auth} />
                <PrivateRoute path={`${match.path}/requiredDocument/:documentId/edit`} component={EditRequiredDocument} auth={auth} />
                <PrivateRoute path={`${match.path}/addRequiredDocument`} component={AddRequiredDocument} auth={auth} />
                <PrivateRoute path={`${match.path}/serviceVehicles`} component={ServiceVehicles} auth={auth} />
                <PrivateRoute path={`${match.path}/serviceVehicle/:vehicleId/edit`} component={EditServiceVehicle} auth={auth} />
                <PrivateRoute path={`${match.path}/addServiceVehicle`} component={AddServiceVehicle} auth={auth} />
                <PrivateRoute path={`${match.path}/scheduled-rides/:page?`} component={ScheduledRides} auth={auth} />
                <PrivateRoute path={`${match.path}/scheduled-ride/:rideId`} exact component={ScheduledRide} auth={auth} />
                <PrivateRoute path={`${match.path}/scheduled-ride/:rideId/edit`} exact component={EditScheduledRide} auth={auth} />
                <PrivateRoute path={`${match.path}/userRides/:userId/:page?`} component={UserRides} auth={auth} />
                <PrivateRoute path={`${match.path}/rides/:status/:page?`} component={Rides} auth={auth} />
                <PrivateRoute path={`${match.path}/ride/:rideId`} component={Ride} auth={auth} />
                <PrivateRoute path={`${match.path}/zones`} component={Zones} auth={auth} />
                <PrivateRoute path={`${match.path}/addZone`} component={AddZone} auth={auth} />
                <PrivateRoute path={`${match.path}/zone/:zoneId`} component={Zone} auth={auth} />
                <PrivateRoute path={`${match.path}/reviews/:userType`} component={Reviews} auth={auth} />
                <PrivateRoute path={`${match.path}/txs/:page?`} component={Txs} auth={auth} />
                <PrivateRoute path={`${match.path}/settings`} exact component={BusinessSettings} auth={auth} />
                <PrivateRoute path={`${match.path}/serviceFarePlans`} component={FareSettings} auth={auth} />
                <PrivateRoute path={`${match.path}/addServiceFarePlan`} component={AddFarePlan} auth={auth} />
                <PrivateRoute path={`${match.path}/serviceFarePlan/:serviceFareId/edit`} component={EditServiceFare} auth={auth} />
                <PrivateRoute path={`${match.path}/lostItems`} component={LostItems} auth={auth} />
                <PrivateRoute path={`${match.path}/lostItem/:lostItemId`} component={LostItemDetails} auth={auth} />
                <PrivateRoute path={`${match.path}/settings/payment`} exact component={PaymentSettings} auth={auth} />
                <PrivateRoute path={`${match.path}/promoCodes`} component={PromoCodes} auth={auth} />
                <PrivateRoute path={`${match.path}/addPromoCode`} component={AddPromoCode} auth={auth} />
                <PrivateRoute path={`${match.path}/promoCode/:promoCodeId/edit`} component={EditPromoCode} auth={auth} />
                <PrivateRoute path={`${match.path}/promoCodeTxs`} component={PromoCodeTxs} auth={auth} />
                <PrivateRoute path={`${match.path}/rewardRule`} component={RewardRule} auth={auth} />
                <PrivateRoute path={`${match.path}/rewardTxs`} component={RewardTxs} auth={auth} />
                <PrivateRoute path={`${match.path}/referralTxs`} component={ReferralTxs} auth={auth} />
                <PrivateRoute path={`${match.path}/referralRule`} component={ReferralRule} auth={auth} />
                <PrivateRoute path={`${match.path}/pushNotifications`} component={PushNotifications} auth={auth} />
                <PrivateRoute path={`${match.path}/addPushNotification`} component={AddPushNotification} auth={auth} />
                <PrivateRoute path={`${match.path}/driver/:userId/finance`} component={DriverFinance} auth={auth} />
                <PrivateRoute path={`${match.path}/supportAgents`} component={SupportAgents} auth={auth} />
                <PrivateRoute path={`${match.path}/addSupportAgent`} component={AddSupportAgent} auth={auth} />
                <PrivateRoute path={`${match.path}/supportTickets/:status`} component={SupportTickets} auth={auth} />
                <PrivateRoute path={`${match.path}/supportTicket/:ticketId`} component={SupportTicketDetails} auth={auth} />
                <PrivateRoute path={`${match.path}/liveLocations`} component={LiveLocations} auth={auth} />
                <PrivateRoute path={`${match.path}/revenue/:period/:page?`} component={Revenue} auth={auth} />                
                <PrivateRoute path={`${match.path}/accounts/:status/:page?`} component={Accounts} auth={auth} />
                <PrivateRoute path={`${match.path}/account/:accountId/edit`} component={EditAccount} auth={auth} />
                <PrivateRoute path={`${match.path}/withdraw/:status/:page?`} component={WithdrawRequests} auth={auth} />
                <PrivateRoute path={`${match.path}/profile`} component={EditAdminProfile} auth={auth} />
                <PrivateRoute path={`${match.path}/vehicleMappings`} component={VehicleMapping} auth={auth} />
                <PrivateRoute path={`${match.path}/addVehicleMapping`} component={AddVehicleMapping} auth={auth} />
                <PrivateRoute path={`${match.path}/vehicleMapping/:vehicleMappingId/edit`} component={EditVehicleMapping} auth={auth} />
                <PrivateRoute path={`${match.path}/wallets/:accountType/:page?`} component={Wallets} auth={auth} />
                <PrivateRoute path={`${match.path}/user/:userId/wallet`} component={UserWallet} auth={auth} />
            </Fragment>
        )
    }
}

function PrivateRoute({ component: Component, ...rest }) {
    const { auth } = rest
    return (
        <Route
            {...rest}
            render={props =>
                auth !== null ? (
                    <Component {...props} />
                )
                    : (
                        <Redirect
                            to={{
                                pathname: '/admin/login',
                                state: { from: props.location.pathname }
                            }}
                        />
                    )
            }
        />
    )
}

function mapStateToProps({ auth }) {
    return {

        auth
    }
}

export default connect(mapStateToProps)(Admin)



