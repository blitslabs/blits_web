const API = process.env.API_HOST + '/'

export function login(params) {
    return fetch(API + 'admin/login', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}

export function getAdminData(params) {
    return fetch(API + 'admin/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function checkAdminAuth(params) {
    return fetch(API + 'admin/checkPrivileges', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getAllUsersByType(params) {
    return fetch(API + `admin/getAllUsersByTypeAndPage/${params.accountType}/${params.page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getUserDetails(params) {
    return fetch(API + `user/${params.userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updateUserDetails(params) {
    return fetch(API + 'admin/user', {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
        credentials: 'include'
    })
}

export function changeUserPassword(params) {
    return fetch(API + 'admin/user/password', {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
        credentials: 'include'
    })
}

export function createUser(params) {
    return fetch(API + 'admin/user', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
        credentials: 'include'
    })
}

export function deleteUser(params) {
    return fetch(API + `admin/user/${params.userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updateUserStatus(params) {
    return fetch(API + `admin/user/status`, {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updateDriverDocumentsStatus(params) {
    return fetch(API + 'admin/user/documentsStatus', {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
        credentials: 'include'
    })
}

export function getUserDocuments(params) {
    return fetch(API + `admin/user/${params.userId}/documents`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updateDocumentStatus(params) {
    return fetch(API + `admin/document/${params.documentId}/status`, {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
        credentials: 'include'
    })
}

export function updateDocument(params) {
    return fetch(API + `admin/document/${params.documentId}`, {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
        credentials: 'include'
    })
}

export function getDocumentDetails(params) {
    return fetch(API + `admin/document/${params.documentId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getRequiredDocuments(params) {
    return fetch(API + `requiredDocuments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getRequiredDocumentsByAccountType(params) {
    return fetch(API + `requiredDocumentsByAccountType/${params.accountType}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getRequiredDocument(params) {
    return fetch(API + `requiredDocument/${params.documentId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updateRequiredDocument(params) {
    return fetch(API + 'admin/requiredDocument', {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
        credentials: 'include'
    })
}

export function createRequiredDocument(params) {
    return fetch(API + 'admin/requiredDocument', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
        credentials: 'include'
    })
}

export function deleteRequiredDocument(params) {
    return fetch(API + `admin/requiredDocument/${params.documentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getServiceVehicles(params) {
    return fetch(API + `serviceVehicles`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getServiceVehicle(params) {
    return fetch(API + `serviceVehicle/${params.vehicleId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updateServiceVehicle(params) {
    return fetch(API + 'admin/serviceVehicle', {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
        credentials: 'include'
    })
}

export function createServiceVehicle(params) {
    return fetch(API + 'admin/serviceVehicle', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
        credentials: 'include'
    })
}

export function deleteServiceVehicle(params) {
    return fetch(API + `admin/serviceVehicle/${params.vehicleId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getUserVehicle(params) {
    return fetch(API + `userVehicle/${params.userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updateUserVehicle(params) {
    return fetch(API + `admin/userVehicle`, {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function deleteUserVehicle(params) {
    return fetch(API + `admin/userVehicle/${params.userVehicleId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getUserRidesByPage(params) {
    return fetch(API + `userRides/${params.userId}/${params.page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getRidesByStatusAndPage(params) {
    return fetch(API + `admin/rides/${params.status}/${params.page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}
// ridesByDateRange/:status/:startDate/:endDate/:page?
export function getRidesByStatusAndDateRangeAndPage(params) {
    return fetch(API + `admin/ridesByDateRange/${params.status}/${params.startDate}/${params.endDate}/${params.page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getRideDetails(params) {
    return fetch(API + `ride/${params.rideId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function deleteRide(params) {
    return fetch(API + `admin/ride/${params.rideId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getMapRoute(params) {
    const from = [params.fromLocation.lng, params.fromLocation.lat]
    const to = [params.toLocation.lng, params.toLocation.lat]
    const URL = process.env.MAPBOX_DIRECTIONS_API + from.toString() + ';' + to.toString() + '?overview=full&geometries=geojson&access_token=' + process.env.MAPBOX_ACCESS_TOKEN
    return fetch(URL, {
        method: 'GET',
    })
}

export function updateRideDetails(params) {
    return fetch(API + 'admin/ride/' + params.rideId, {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },

    })
}

export function getZones(params) {
    return fetch(API + `zones`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getZone(params) {
    return fetch(API + `zone/${params.zoneId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updateZone(params) {
    return fetch(API + 'admin/zone', {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
        credentials: 'include'
    })
}

export function createZone(params) {
    return fetch(API + 'admin/zone', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
        credentials: 'include'
    })
}

export function deleteZone(params) {
    return fetch(API + `admin/zone/${params.zoneId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getReviews(params) {
    return fetch(API + `reviews/${params.reviewType}/${params.page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getTxs(params) {
    return fetch(API + `admin/txs/${params.page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getBusinessSettings(params) {
    return fetch(API + `admin/settings/business`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updateBusinessSettings(params) {
    return fetch(API + `admin/settings/business`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getServiceFarePlans(params) {
    return fetch(API + `serviceFarePlans`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getServiceFarePlan(params) {
    return fetch(API + `serviceFarePlan/${params.serviceFareId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updateServiceFarePlan(params) {
    return fetch(API + 'admin/serviceFarePlan', {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
        credentials: 'include'
    })
}

export function createServiceFarePlan(params) {
    return fetch(API + 'admin/serviceFarePlan', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
        credentials: 'include'
    })
}

export function deleteServiceFarePlan(params) {
    return fetch(API + `admin/serviceFarePlan/${params.serviceFareId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getLostItems(params) {
    return fetch(API + `admin/lostItems`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getLostItemDetails(params) {
    return fetch(API + `lostItem/${params.lostItemId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updateLostItem(params) {
    return fetch(API + 'lostItem', {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
    })
}

export function createLostItem(params) {
    return fetch(API + 'lostItem', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },

    })
}

export function deleteLostItem(params) {
    return fetch(API + `admin/lostItem/${params.lostItemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getPaymentSettings(params) {
    return fetch(API + `admin/settings/payment`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updatePaymentSettings(params) {
    return fetch(API + `admin/settings/payment`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getCurrencies(params) {
    return fetch(API + 'currencies', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getPromoCodes(params) {
    return fetch(API + `admin/promoCodes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getPromoCodeDetails(params) {
    return fetch(API + `promoCode/${params.promoCodeId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updatePromoCode(params) {
    return fetch(API + 'admin/promoCode', {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
    })
}

export function createPromoCode(params) {
    return fetch(API + 'admin/promoCode', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },

    })
}

export function deletePromoCode(params) {
    return fetch(API + `admin/promoCode/${params.promoCodeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getPromoCodeTxs(params) {
    return fetch(API + `admin/promoCodeTxs/${params.code}/${params.page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}


export function getRewardRule(params) {
    return fetch(API + `admin/rewardRule`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updateRewardRule(params) {
    return fetch(API + 'admin/rewardRule', {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
    })
}

export function getRewardTxs(params) {
    return fetch(API + `admin/rewardTxs/${params.page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getReferralRule(params) {
    return fetch(API + `admin/referralRule`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updateReferralRule(params) {
    return fetch(API + 'admin/referralRule', {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
    })
}

export function getReferralTxs(params) {
    return fetch(API + `admin/referralTxs/${params.page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getPushNotifications(params) {
    return fetch(API + `admin/pushNotifications/${params.page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function createPushNotification(params) {
    return fetch(API + 'admin/pushNotification', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },

    })
}

export function deletePushNotification(params) {
    return fetch(API + `admin/pushNotification/${params.notificationId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getDriverStats(params) {
    return fetch(API + `driver/${params.userId}/stats`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getSupportTickets(params) {
    return fetch(API + `admin/supportTickets/${params.status}/${params.page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getSupportTicketDetails(params) {
    return fetch(API + `supportTicket/${params.ticketId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updateSupportTicket(params) {
    return fetch(API + 'admin/supportTicket', {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
    })
}

export function deleteSupportTicket(params) {
    return fetch(API + `admin/supportTicket/${params.ticketId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getGlobalMapData(params) {
    return fetch(API + `admin/globalMap`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getGlobalStatementStatsByPeriod(params) {
    return fetch(API + `admin/global/stats/${params.period}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getGlobalStatementStatsByRange(params) {
    return fetch(API + `admin/global/statsByRange/${params.startDate}/${params.endDate}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getAccountsByStatus(params) {
    return fetch(API + `admin/accounts/${params.status}/${params.page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getAccountDetails(params) {
    return fetch(API + `account/${params.accountId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updateAccount(params) {
    return fetch(API + 'admin/account', {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
    })
}

export function approveAccount(params) {
    return fetch(API + `admin/account/${params.accountId}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
    })
}

export function deleteAccount(params) {
    return fetch(API + `admin/account/${params.accountId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}


export function getWithdrawRequestsByStatus(params) {
    return fetch(API + `admin/withdrawRequests/${params.status}/${params.page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getWithdrawRequest(params) {
    return fetch(API + `withdrawRequest/${params.requestId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function approveWithdrawRequest(params) {
    return fetch(API + `admin/withdrawRequest/${params.requestId}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
    })
}

export function approveAllWithdrawRequests(params) {
    return fetch(API + `admin/approveAllWithdrawRequests`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getUsersStats(params) {
    return fetch(API + `admin/users/stats`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getDriversStats(params) {
    return fetch(API + `admin/drivers/stats`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getDashboardData(params) {
    return fetch(API + `admin/dashboard/data`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getVehicleMappings(params) {
    return fetch(API + `admin/vehicleMappings`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getVehicleMappingDetails(params) {
    return fetch(API + `admin/vehicleMapping/${params.vehicleMappingId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function createVehicleMapping(params) {
    return fetch(API + 'admin/vehicleMapping', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },

    })
}
export function updateVehicleMapping(params) {
    return fetch(API + 'admin/vehicleMapping', {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        },
    })
}

export function deleteVehicleMapping(params) {
    return fetch(API + `admin/vehicleMapping/${params.vehicleMappingId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getUserWallets(params) {
    return fetch(API + `admin/wallets/${params.accountType}/${params.page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getUserWalletDetails(params) {
    return fetch(API + `admin/wallet/${params.userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getAdminPermissions(params) {
    return fetch(API + `admin/permissions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getAdminUsers(params) {
    return fetch(API + `admin/adminusers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getAdminUser(params) {
    return fetch(API + `admin/adminuser/${params.userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function createAdminUser(params) {
    return fetch(API + `admin/adminuser`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function updateAdminUserPermissions(params) {
    return fetch(API + `admin/adminuser`, {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function deleteAdminUser(params) {
    return fetch(API + `admin/adminuser/${params.userId}`, {
        method: 'DELETE',        
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}