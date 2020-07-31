const Sepomex = require('../models/sequelize').Sepomex
const sequelize = require('../models/sequelize').sequelize
const fs = require('fs')
const path = require('path')
const LineByLineReader = require('line-by-line')
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const Papa = require('papaparse')
const xml2js = require('xml2js')


module.exports.getAddressesByPostalCode = (req, res) => {
    const postalCode = req.params.postalCode

    if(!postalCode) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos'})
        return
    }

    sequelize.transaction(async (t) => {
        const addresses = await Sepomex.findAll({
            where: {
                codigoPostal: postalCode,
            },
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: addresses})
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la acción'})
            return
        })
}

module.exports.importSepomexCatalogFromXLM = (req, res) => {
    var parser = new xml2js.Parser()
    const file = fs.readFileSync(path.join(APP_ROOT, 'app_api/config/sepomex.xml'))

    parser.parseString(file, async function (err, result) {
        if (err) {
            return console.log(err)
        }
        const table = result.NewDataSet.table

        for (let data of table) {
            await Sepomex.create({
                codigoPostal: 'd_codigo' in data && data['d_codigo'][0],
                asentamiento: 'd_asenta' in data && data['d_asenta'][0],
                tipoAsentamiento: 'd_tipo_asenta' in data && data['d_tipo_asenta'][0],
                municipio: 'D_mnpio' in data && data['D_mnpio'][0],
                estado: 'd_estado' in data && data['d_estado'][0],
                ciudad: 'd_ciudad' in data && data['d_ciudad'][0],
                // codigoPostal: 'd_CP' in data && data['d_CP'][0],
            })
        }

        sendJSONresponse(res, 200, { status: 'OK', message: 'SEPOMEX\'s catalog imported correctly', })
        return
    })
}

module.exports.importSepomexCatalogFromTxt = (req, res) => {
    console.log(path.join(APP_ROOT, 'app_api/config/sepomex.txt'))
    // const sepomex = JSON.parse(fs.readFileSync(path.join(APP_ROOT, 'app_api/config/sepomex.json'), 'utf8'))

    const lr = new LineByLineReader(path.join(APP_ROOT, 'app_api/config/sepomex.txt'), {
        // encoding: 'utf8',
        skipEmptyLines: true
    })

    console.log('test')
    lr.on('line', function (line) {
        let data = Papa.parse(line, { encoding: "ISO-8859-1" })
        data = data.split('|')
        lr.pause()
        Sepomex.create({
            codigo: data[0],
            asentamiento: data[1],
            tipoAsentamiento: data[2],
            municipio: data[3],
            estado: data[4],
            ciudad: data[5],
            codigoPostal: data[6],
        }).then(() => lr.resume())
    });


    lr.on('error', function (err) {
        console.log(err)
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Error importing catalog' })
        return
    });

    lr.on('end', function () {
        // All lines are read, file is closed now.
        sendJSONresponse(res, 200, { status: 'OK', message: 'SEPOMEX\'s catalog imported correctly' })
        return
    })

}