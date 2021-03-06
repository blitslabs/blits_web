
const fetch = require('node-fetch')
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const API_HOST = process.env.API_HOST
const rp = require('request-promise')

module.exports.renderExternalViews = (req, res) => {
    res.render('external_container', {
        host: process.env.SERVER_HOST,
        react_host: process.env.REACT_HOST,
    })
}

module.exports.renderApp = function(req, res) {    
    res.render('app_container', {
        host: process.env.SERVER_HOST,
        react_host: process.env.REACT_HOST,
    })
}

module.exports.renderHome = (req, res) => {
    res.render('home', {
        host: process.env.SERVER_HOST,
    })
}

// module.exports.renderAdminApp = function (req, res) {    
//     res.render('app_container', {
//         host: process.env.SERVER_HOST,
//         react_host: process.env.REACT_HOST,
//     })
// }

// module.exports.test = (req, res) => {
//     console.log('test');
// }