const PreCreditRequest = require('../models/sequelize').PreCreditRequest
const CreditReport = require('../models/sequelize').CreditReport
const CreditReportConsulta = require('../models/sequelize').CreditReportConsulta
const CreditReportCredito = require('../models/sequelize').CreditReportCredito
const CreditReportDomicilio = require('../models/sequelize').CreditReportDomicilio
const CreditReportEmpleo = require('../models/sequelize').CreditReportEmpleo
const CreditReportMensaje = require('../models/sequelize').CreditReportMensaje
const CreditReportScore = require('../models/sequelize').CreditReportScore
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const getStateCodeByName = require('../../utils/index').getStateCodeByName
const rp = require('request-promise')
const moment = require('moment')

module.exports.getReporteCreditoConsolidadoPrecalificador = (req, res) => {

    const preCreditRequestId = req.params.preCreditRequestId

    if (!preCreditRequestId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    // Create CreditReport
    sequelize.transaction(async (t) => {

        const preCreditRequest = await PreCreditRequest.findOne({
            where: {
                id: preCreditRequestId
            },
            transaction: t
        })

        if(!preCreditRequest) {
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Solicitud de crédito no encontrada'})
            return
        }

        const URL = `https://services.circulodecredito.com.mx/sandbox/v1/rcc-ficoscore-pld`

        // const params = {
        //     "apellidoPaterno": "SESENTAYDOS",
        //     "apellidoMaterno": "PRUEBA",
        //     "primerNombre": "JUAN",
        //     "fechaNacimiento": "1965-08-09",
        //     "RFC": "SEPJ650809JG1",
        //     "nacionalidad": "MX",
        //     "domicilio": {
        //         "direccion": "PASADISO ENCONTRADO 58",
        //         "coloniaPoblacion": "MONTEVIDEO",
        //         "delegacionMunicipio": "GUSTAVO A MADERO",
        //         "ciudad": "CIUDAD DE MÉXICO",
        //         "estado": "CDMX",
        //         "CP": "07730"
        //     }
        // } 

        const params = {
            "apellidoPaterno": preCreditRequest.lastName.toUpperCase(),
            "apellidoMaterno": preCreditRequest.secondLastName.toUpperCase(),
            "primerNombre": preCreditRequest.firstName.toUpperCase(),
            "fechaNacimiento": moment(preCreditRequest.dateOfBirth).format('YYYY-MM-DD'),
            "RFC": preCreditRequest.rfc.toUpperCase(),
            "nacionalidad": "MX",
            "domicilio": {
                "direccion": preCreditRequest.calle.toUpperCase() + ' ' + preCreditRequest.numeroExt,
                "coloniaPoblacion": preCreditRequest.colonia.toUpperCase(),
                "delegacionMunicipio": preCreditRequest.municipio.toUpperCase(),
                "ciudad": preCreditRequest.entidadFederativa.toUpperCase(),
                "estado": getStateCodeByName(preCreditRequest.entidadFederativa),
                "CP": preCreditRequest.postalCode
            }
        }

        let response = await rp(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.CIRCULO_CREDITO_API_KEY,
                'x-full-report': true
            },
            body: JSON.stringify(params)
        })

        response = JSON.parse(response)

        const creditReport = await CreditReport.create({
            folioConsulta: response.folioConsulta,
            folioConsultaOtorgante: response.folioConsultaOtorgante,
            claveOtorgante: response.claveOtorgante,
            declaracionesConsumidor: response.declaracionesConsumidor,
            apellidoPaterno: response.persona.apellidoPaterno,
            apellidoMaterno: response.persona.apellidoMaterno,
            nombres: response.persona.nombres,
            RFC: response.persona.RFC,
            nacionalidad: response.persona.nacionalidad,
            residencia: response.persona.residencia,
            estadoCivil: response.persona.estadoCivil,
            sexo: response.persona.sexo,
            numeroDependientes: response.persona.numeroDependientes
        }, { transaction: t })

        for (let consulta of response.consultas) {
            await CreditReportConsulta.create({
                creditReportId: creditReport.id,
                fechaConsulta: consulta.fechaConsulta,
                nombreOtorgante: consulta.nombreOtorgante,
                telefonoOtorgante: consulta.telefonoOtorgante,
                tipoCredito: consulta.tipoCredito,
                claveUnidadMonetaria: consulta.claveUnidadMonetaria,
                importeCredito: consulta.importeCredito,
            }, { transaction: t })
        }

        for (let credito of response.creditos) {
            await CreditReportCredito.create({
                creditReportId: creditReport.id,
                fechaActualizacion: credito.fechaActualizacion,
                registroImpugnado: credito.registroImpugnado,
                nombreOtorgante: credito.nombreOtorgante,
                cuentaActual: credito.cuentaActual,
                tipoResponsabilidad: credito.tipoResponsabilidad,
                tipoCuenta: credito.tipoCuenta,
                tipoCredito: credito.tipoCredito,
                claveUnidadMonetaria: credito.claveUnidadMonetaria,
                valorActivoValuacion: credito.valorActivoValuacion,
                numeroPagos: credito.numeroPagos,
                frecuenciaPagos: credito.frecuenciaPagos,
                montoPagar: credito.montoPagar,
                fechaAperturaCuenta: credito.fechaAperturaCuenta,
                fechaUltimoPago: credito.fechaUltimoPago,
                fechaUltimaCompra: credito.fechaUltimaCompra,
                fechaReporte: credito.fechaReporte,
                creditoMaximo: credito.creditoMaximo,
                saldoActual: credito.saldoActual,
                limiteCredito: credito.limiteCredito,
                saldoVencido: credito.saldoVencido,
                numeroPagosVencidos: credito.numeroPagosVencidos,
                pagoActual: credito.pagoActual,
                historicoPagos: credito.historicoPagos,
                totalPagosReportados: credito.totalPagosReportados,
                peorAtraso: credito.peorAtraso,
                fechaPeorAtraso: credito.fechaPeorAtraso,
                saldoVencidoPeorAtraso: credito.saldoVencidoPeorAtraso,
            }, { transaction: t })
        }

        for (let domicilio of response.domicilios) {
            await CreditReportDomicilio.create({
                creditReportId: creditReport.id,
                direccion: domicilio.direccion,
                coloniaPoblacion: domicilio.coloniaPoblacion,
                delegacionMunicipio: domicilio.delegacionMunicipio,
                ciudad: domicilio.ciudad,
                estado: domicilio.estado,
                CP: domicilio.CP,
                numeroTelefono: domicilio.numeroTelefono,
                fechaResidencia: domicilio.fechaResidencia,
                fechaRegistroDomicilio: domicilio.fechaRegistroDomicilio
            }, { transaction: t })
        }

        for (let empleo of response.empleos) {
            await CreditReportEmpleo.create({
                creditReportId: creditReport.id,
                nombreEmpresa: empleo.nombreEmpresa,
                direccion: empleo.direccion,
                coloniaPoblacion: empleo.coloniaPoblacion,
                delegacionMunicipio: empleo.delegacionMunicipio,
                ciudad: empleo.ciudad,
                estado: empleo.estado,
                CP: empleo.CP,
                numeroTelefono: empleo.numeroTelefono,
                extension: empleo.extension,
                fax: empleo.fax,
                puesto: empleo.puesto,
                fechaContratacion: empleo.fechaContratacion,
                claveMoneda: empleo.claveMoneda,
                salarioMensual: empleo.salarioMensual,
                fechaUltimoDiaEmpleo: empleo.fechaUltimoDiaEmpleo,
                fechaVerificacionEmpleo: empleo.fechaVerificacionEmpleo,
            }, { transaction: t })
        }

        for (let score of response.scores) {
            await CreditReportScore.create({
                creditReportId: creditReport.id,
                nombreScore: score.nombreScore,
                valor: score.valor,
                razones: JSON.stringify(score.razones)
            }, { transaction: t })
        }

        for (let mensaje of response.mensajes) {
            await CreditReportMensaje.create({
                creditReportId: creditReport.id,
                tipoMensaje: mensaje.tipoMensaje,
                leyenda: mensaje.leyenda,
            }, { transaction: t })
        }

        // Update CreditReportId in PreCreditRequest
        preCreditRequest.creditReportId = creditReport.id
        await preCreditRequest.save({ transaction: t })

        sendJSONresponse(res, 200, { status: 'OK', payload: response })
        return

    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'Ocurrió un error al intentar realizar la acción' })
            return
        })
}

