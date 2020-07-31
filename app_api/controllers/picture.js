
const Picture = require('../models/sequelize').Picture
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const sequelize = require('../models/sequelize').sequelize
const fs = require('fs')

module.exports.getPicture = (req, res) => {
    const pictureId = req.params.pictureId

    if(!pictureId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos'} )
        return
    }

    sequelize.transaction(async (t) => {
        
        const picture = await Picture.findOne({
            where: {
                id: pictureId
            },
            transaction: t
        })
        
        if(!picture) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Imagen no encontrada'})
            return
        }

        fs.readFile(picture.path, (err, data) => {
            if(err) {
                console.log(err)
                sendJSONresponse(res, 404, {status: 'ERROR', message: 'Error reading image'})
                return
            }
            res.writeHead(200, {'Content-Type': 'image/png'})
            res.end(data, 'binary')
        })
        
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}