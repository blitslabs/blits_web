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

const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const pdf = require('html-pdf');
const currencyFormatter = require('currency-formatter');
const puppeteer = require('puppeteer')

module.exports.getCreditReportPDF = (req, res) => {

    const creditReportId = req.params.creditReportId

    if (!creditReportId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {

        const creditos = await CreditReportCredito.findAll({
            where: {
                creditReportId,
            },
            transaction: t
        })

        const summary = {
            bienesRaices: { cuentas: 0, limite: 0, aprobado: 0, actual: 0, vencido: 0, pagoSemanal: 0, pagoQuincenal: 0, pagoMensual: 0 },
            compraAutomovil: { cuentas: 0, limite: 0, aprobado: 0, actual: 0, vencido: 0, pagoSemanal: 0, pagoQuincenal: 0, pagoMensual: 0 },
            lineaCredito: { cuentas: 0, limite: 0, aprobado: 0, actual: 0, vencido: 0, pagoSemanal: 0, pagoQuincenal: 0, pagoMensual: 0 },
            prestamoNomina: { cuentas: 0, limite: 0, aprobado: 0, actual: 0, vencido: 0, pagoSemanal: 0, pagoQuincenal: 0, pagoMensual: 0 },
            tarjetaCredito: { cuentas: 0, limite: 0, aprobado: 0, actual: 0, vencido: 0, pagoSemanal: 0, pagoQuincenal: 0, pagoMensual: 0 },
            otros: { cuentas: 0, limite: 0, aprobado: 0, actual: 0, vencido: 0, pagoSemanal: 0, pagoQuincenal: 0, pagoMensual: 0 },
            total: { cuentas: 0, limite: 0, aprobado: 0, actual: 0, vencido: 0, pagoSemanal: 0, pagoQuincenal: 0, pagoMensual: 0 },
        }

        for (let c of creditos) {

            let tipoCredito
            switch (c.tipoCredito) {
                case 'BR':
                    tipoCredito = 'bienesRaices'
                    break
                case 'CA':
                    tipoCredito = 'compraAutomovil'
                    break
                case 'LC':
                    tipoCredito = 'lineaCredito'
                    break
                case 'PN':
                    tipoCredito = 'prestamoNomina'
                    break
                case 'TC':
                    tipoCredito = 'tarjetaCredito'
                    break
                default:
                    tipoCredito = 'otros'
                    break
            }

            summary[tipoCredito].cuentas += 1
            summary[tipoCredito].limite += parseFloat(c.limiteCredito)
            summary[tipoCredito].aprobado += parseFloat(c.creditoMaximo)
            summary[tipoCredito].actual += parseFloat(c.saldoActual)
            summary[tipoCredito].vencido += parseFloat(c.saldoVencido)
            summary[tipoCredito].pagoSemanal += c.frecuenciaPagos === 'S' ? parseFloat(c.montoPagar) : 0
            summary[tipoCredito].pagoQuincenal += (c.frecuenciaPagos === 'C' || c.frecuenciaPagos === 'Q') ? parseFloat(c.montoPagar) : 0
            summary[tipoCredito].pagoMensual += c.frecuenciaPagos === 'M' ? parseFloat(c.montoPagar) : 0

            summary.total.cuentas += 1
            summary.total.limite += parseFloat(c.limiteCredito)
            summary.total.aprobado += parseFloat(c.creditoMaximo)
            summary.total.actual += parseFloat(c.saldoActual)
            summary.total.vencido += parseFloat(c.saldoVencido)
            summary.total.pagoSemanal += c.frecuenciaPagos === 'S' ? parseFloat(c.montoPagar) : 0
            summary.total.pagoQuincenal += (c.frecuenciaPagos === 'C' || c.frecuenciaPagos === 'Q') ? parseFloat(c.montoPagar) : 0
            summary.total.pagoMensual += c.frecuenciaPagos === 'M' ? parseFloat(c.montoPagar) : 0
        }

        const summaryFormatted = JSON.parse(JSON.stringify(summary))

        Object.values(summaryFormatted).map((c) => {
            c.limite = currencyFormatter.format(c.limite, { code: 'USD' })
            c.aprobado = currencyFormatter.format(c.aprobado, { code: 'USD' })
            c.actual = currencyFormatter.format(c.actual, { code: 'USD' })
            c.vencido = currencyFormatter.format(c.vencido, { code: 'USD' })
            c.pagoSemanal = currencyFormatter.format(c.pagoSemanal, { code: 'USD' })
            c.pagoQuincenal = currencyFormatter.format(c.pagoQuincenal, { code: 'USD' })
            c.pagoMensual = currencyFormatter.format(c.pagoMensual, { code: 'USD' })
        })

        const score = await CreditReportScore.findOne({
            where: {
                creditReportId,
            },
            transaction: t
        })

        const domicilios = await CreditReportDomicilio.findAll({
            where: {
                creditReportId,
            },
            transaction: t
        })

        const empleos = await CreditReportEmpleo.findAll({
            where: {
                creditReportId,
            },
            transaction: t
        })

        const consultas = await CreditReportConsulta.findAll({
            where: {
                creditReportId,
            },
            transaction: t
        })

        const mensajes = await CreditReportMensaje.findAll({
            where: {
                creditReportId,
            },
            transaction: t
        })

        const params = {
            host: process.env.SERVER_HOST,
            company: 'Sway Lending',
            score,
            creditos,
            domicilios,
            empleos,
            consultas,
            mensajes,
            summary,
            summaryFormatted
        }

        ejs.renderFile(path.resolve(APP_ROOT + '/utils/creditReport/creditReportTemplate.ejs'), { data: params }, async (err, result) => {
            if (result) {
                let html = result

                var finalHtml = encodeURIComponent(html);


                var options = {
                    format: 'A4',
                    headerTemplate: "<p></p>",
                    footerTemplate: "<p></p>",
                    displayHeaderFooter: false,
                    margin: {
                        top: "40px",
                        bottom: "100px"
                    },
                    printBackground: true,
                    path: path.resolve(APP_ROOT + '/uploads/documents/test.pdf')
                }

                const browser = await puppeteer.launch({
                    args: ['--no-sandbox'],
                    headless: true
                });

                const page = await browser.newPage();
                await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`, {
                    waitUntil: 'networkidle0'
                });
                await page.pdf(options);
                await browser.close();
                console.log('done')
                res.send(html)
                // const options = { format:'A3', width: '8in', height: '10.5in',"format": "Letter" }
                // pdf.create(html, options).toFile(path.resolve(APP_ROOT + '/uploads/documents/test.pdf'), function (err, stream) {
                //     if (err) return console.log(err);
                //     console.log(stream); // { filename: '/app/businesscard.pdf' }
                    
                // });

                // pdf.create(html, options).toStream((err, stream) => {
                //     if (err) return console.log(err);

                //     res.setHeader('Content-type', 'application/pdf')
                //     stream.pipe(res)
                // })
                return
            } else {
                console.log(err)
            }


        })

    })
}