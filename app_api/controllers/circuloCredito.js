const PreCreditRequest = require('../models/sequelize').PreCreditRequest
const CreditReport = require('../models/sequelize').CreditReport
const CreditReportConsulta = require('../models/sequelize').CreditReportConsulta
const CreditReportCredito = require('../models/sequelize').CreditReportCredito
const CreditReportDomicilio = require('../models/sequelize').CreditReportDomicilio
const CreditReportEmpleo = require('../models/sequelize').CreditReportEmpleo
const CreditReportMensaje = require('../models/sequelize').CreditReportMensaje
const CreditReportScore = require('../models/sequelize').CreditReportScore
const sequelize = require('../models/sequelize').sequelize
const { Op } = require('sequelize')
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const getStateCodeByName = require('../../utils/index').getStateCodeByName
const sendWACreditResponse = require('../../utils/whatsapp').sendWACreditResponse
const rp = require('request-promise')
const moment = require('moment')
const currencyFormatter = require('currency-formatter')
const fs = require('fs').promises
const path = require('path')

module.exports.getReporteCreditoConsolidadoPrecalificador = (req, res) => {

    const preCreditRequestHash = req.params.preCreditRequestHash

    if (!preCreditRequestHash) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    // Create CreditReport
    sequelize.transaction(async (t) => {

        const preCreditRequest = await PreCreditRequest.findOne({
            where: {
                hash: preCreditRequestHash
            },
            transaction: t
        })

        if (!preCreditRequest) {
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Solicitud de crédito no encontrada' })
            return
        }

        const URL = `https://services.circulodecredito.com.mx/sandbox/v1/rcc-ficoscore-pld`

        const params = {
            "apellidoPaterno": preCreditRequest.lastName.toUpperCase(),
            "apellidoMaterno": preCreditRequest.secondLastName.toUpperCase(),
            "primerNombre": preCreditRequest.firstName.toUpperCase(),
            "fechaNacimiento": moment(Date.parse(preCreditRequest.dateOfBirth)).format('YYYY-MM-DD'),
            "RFC": preCreditRequest.rfc.toUpperCase(),
            "nacionalidad": "MX",
            "domicilio": {
                "direccion": preCreditRequest.calle.toUpperCase() + ' ' + preCreditRequest.numeroExt,
                "coloniaPoblacion": preCreditRequest.colonia.replace('.', '').toUpperCase(),
                "delegacionMunicipio": preCreditRequest.municipio.replace('.', '').toUpperCase(),
                "ciudad": preCreditRequest.entidadFederativa.toUpperCase(),
                "estado": getStateCodeByName(preCreditRequest.entidadFederativa),
                "CP": preCreditRequest.postalCode
            }
        }

        let response
        let recordFound = 1
        let saldoVencido = 0

        try {
            response = await rp(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.CIRCULO_CREDITO_API_KEY,
                    'x-full-report': true
                },
                body: JSON.stringify(params)
            })

            response = JSON.parse(response)

        } catch (e) {
            console.log(e)
            recordFound = 0
            // sendJSONresponse(res, 200, { status: 'ERROR', payload: { saldoVencido, recordFound }, message: 'No se encontró ningún registro con los datos ingresados' })
            // return
        }

        if (recordFound === 1) {
            const creditReport = await CreditReport.create({
                folioConsulta: response.folioConsulta,
                folioConsultaOtorgante: response.folioConsultaOtorgante,
                claveOtorgante: response.claveOtorgante,
                declaracionesConsumidor: response.declaracionesConsumidor,
                apellidoPaterno: response.persona.apellidoPaterno,
                apellidoMaterno: response.persona.apellidoMaterno,
                nombres: response.persona.nombres,
                fechaNacimiento: response.persona.fechaNacimiento,
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
                saldoVencido += parseFloat(credito.saldoVencido)

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

            // Update Credit Report ID
            preCreditRequest.creditReportId = creditReport.id

            // Count today's records
            const TODAY_START = new Date().setHours(0, 0, 0, 0)
            const NOW = new Date()
            const creditRequestsCount = await PreCreditRequest.count({
                where: {
                    createdAt: {
                        [Op.gt]: TODAY_START,
                        [Op.lt]: NOW,
                    }
                },
                transaction: t
            })

            // Create Audit File
            const auditData = {
                folioConsulta: response.folioConsulta,
                fechaConsulta: moment().format('YYYY/MM/DD'),
                horaConsulta: moment().format('HH:mm:ss'),
                nombreCliente: preCreditRequest.lastName.toUpperCase() + ' ' + preCreditRequest.secondLastName.toUpperCase() + ' ' + preCreditRequest.firstName.toUpperCase(),
                rfc: preCreditRequest.rfc,
                calleNumbero: preCreditRequest.calle.toUpperCase() + ' ' + preCreditRequest.numeroExt,
                colonia: preCreditRequest.colonia.replace('.', '').toUpperCase(),
                estado: preCreditRequest.entidadFederativa.replace('.', '').toUpperCase(),
                codigoPostal: preCreditRequest.postalCode,
                tipoConsulta: 'PF',
                usuario: process.env.CIRUCLO_CREDITO_USER,
                fechaAprobacionConsulta: moment().format('YYYY-MM-DD'), // Debe ser anterior (pueden ser segundos) a la fecha de consulta
                horaAprobacionConsulta: moment().subtract(5, 'seconds').format('HH:mm:ss'),
                ingresoNuevamenteNip: 'SI',
                respuestaLeyendaAutorizacion: 'SI',
                aceptacionTerminos: 'SI',
                creditRequestsCount,
            }

            crearAuditFile(auditData)            
        }


        // Calculate result
        let resultado, montoMaximo
        let creditAmount = parseFloat(preCreditRequest.creditAmount.replace('$', '').replace(/,/g, ''))

        if (saldoVencido > 0 || recordFound !== 1) {
            resultado = 'P.E.'
            montoMaximo = currencyFormatter.format(creditAmount * 1.032, { code: 'USD' })
        } else {
            resultado = 'PRE-APROBADO'
            montoMaximo = currencyFormatter.format(creditAmount * 1.17, { code: 'USD' })
        }

        // Update CreditReportId in PreCreditRequest
        preCreditRequest.saldoVencido = saldoVencido
        preCreditRequest.result = resultado
        preCreditRequest.montoMaximo = montoMaximo
        await preCreditRequest.save({ transaction: t })

        // Send Credit Request Response
        // Email

        // Whatsapp
        const waData = {
            phone: preCreditRequest.phone.length === 10 ? ('52' + preCreditRequest.phone) : preCreditRequest.phone,
            primerNombre: preCreditRequest.firstName,
            apellidoPaterno: preCreditRequest.lastName,
            rfc: preCreditRequest.rfc,
            resultado,
            monto: montoMaximo,
            enlaceHistorial: `${process.env.API_HOST}/creditReport/pdf/${preCreditRequest.hash}`
        }

        try {
            if (process.env.ENABLE_WHATSAPP == 1) {
                sendWACreditResponse(waData)
            }
        } catch (e) {
            console.log(e)
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: { resultado, montoMaximo }, message: 'Reporte de crédito guardado correctamente' })
        return

    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'Ocurrió un error al intentar realizar la acción' })
            return
        })
}



async function crearAuditFile(data) {
    let record = 'FOLIO_CDC|FECHA_CONSULTA|HORA_CONSULTA|NOMBRE_CLIENTE|RFC|CALLE_NUMERO|COLONIA|CIUDAD|Estado|TIPO_CONSULTA|USUARIO|FECHA_APROBACION_CONSULTA|HORA_APROBACION_CONSULTA|INGRESO_NUEVAMENTE_NIP|RESPUESTA_LEYENDA_AUTORIZACION|ACEPTACION_TERMINOS_Y_CONDICIONES|'
    Object.values(data).map((d) => record += `${d}|`)
    const consecutivo = data.creditRequestsCount.toString().length == 1 ? ('0' + data.creditRequestsCount.toString()) : data.creditRequestsCount
    const fileName = `${process.env.NUMERO_OTORGANTE}${moment().format('YYMMDD')}${consecutivo}.txt`
    console.log(fileName)
    await fs.writeFile(path.resolve(APP_ROOT + '/uploads/auditoria/' + fileName), record, 'utf8');
}
