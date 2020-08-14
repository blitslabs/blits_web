const rp = require('request-promise')

module.exports.sendWACreditResponse = async (data) => {
    
    const message = `*${data.primerNombre} ${data.apellidoPaterno},* tenemos Lista tu Pre-Calificación: \n\n RFC: \n _${data.rfc}_ \n\n Resultado: *${data.resultado}* \n\n Monto máximo que puede solicitar: *${data.monto}* \n\n Para más información agenda una visita en nuestra oficina en el siguiente enlace \n\n https://swaylending.com/agendar-cita \n[para poder pulsar el enlace registra este teléfono a tus contactos] \n\n Visita nuestra oficina en Villahermosa Tab, Plaza Deportiva (MEGA) dentro de la plaza arriba de Starbucks.\n\n *Descarga el análisis de tu historial crediticio en el siguiente enlace:* \n ${data.enlaceHistorial}\n\n *Atte. Equipo Sway Lending*`

    const params = {
        token: process.env.WHATSAPP_API_KEY,
        uid: process.env.WHATSAPP_PHONE_NUMBER,
        to: data.phone,
        custom_uid: 'msg-' + Math.floor(100000 + Math.random() * 900000),
        text: message
    }

    const response = await rp('https://www.waboxapp.com/api/send/chat', {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: params
    })

    return response
}

module.exports.sendWhatsappMessage = async (toPhoneNumber, textMessage) => {

    const params = {
        token: process.env.WHATSAPP_API_KEY,
        uid: process.env.WHATSAPP_PHONE_NUMBER,
        to: toPhoneNumber,
        custom_uid: 'msg-' + Math.floor(100000 + Math.random() * 900000),
        text: textMessage
    }

    const response = await rp('https://www.waboxapp.com/api/send/chat', {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: params
    })

    return response
}