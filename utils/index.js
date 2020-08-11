module.exports.sendJSONresponse = function (res, status, content) {
    res.status(status)
    res.json(content)
}


const entidades = [
    {
        name: 'Distrito Federal',
        code: 'DIF'
    },
    {
        name: 'Ciudad de México',
        code: 'CDMX'
    },
    {
        name: 'Aguascalientes',
        code: 'AGS'
    },
    {
        name: 'Baja California',
        code: 'BCN'
    },
    {
        name: 'Baja California Sur',
        code: 'BCS'
    },
    {
        name: 'Campeche',
        code: 'CAM'
    },
    {
        name: 'Chiapas',
        code: 'CHP'
    },
    {
        name: 'Chihuahua',
        code: 'CHI'
    },
    {
        name: 'Coahuila',
        code: 'COA'
    },
    {
        name: 'Colima',
        code: 'COL'
    },
    {
        name: 'Durango',
        code: 'DUR'
    },
    {
        name: 'Guanajuato',
        code: 'GTO'
    },
    {
        name: 'Guerrero',
        code: 'GRO'
    },
    {
        name: 'Hidalgo',
        code: 'HGO'
    },
    {
        name: 'Jalisco',
        code: 'JAL'
    },
    {
        name: 'México',
        code: 'MEX'
    },{
        name: 'Michoacán',
        code: 'MIC'
    },
    {
        name: 'Morelos',
        code: 'MOR'
    },
    {
        name: 'Nayarit',
        code: 'NAY'
    },
    {
        name: 'Nuevo León',
        code: 'NLE'
    },
    {
        name: 'Oaxaca',
        code: 'OAX'
    },
    {
        name: 'Puebla',
        code: 'PUE'
    },
    {
        name: 'Querétaro',
        code: 'QRO'
    },
    {
        name: 'Quintana Roo',
        code: 'ROO'
    },
    {
        name: 'San Luis Potosí',
        code: 'SLP'
    },
    {
        name: 'Sinaloa',
        code: 'SIN'
    },
    {
        name: 'Sonora',
        code: 'SON'
    },
    {
        name: 'Tabasco',
        code: 'TAB'
    },
    {
        name: 'Tamaulipas',
        code: 'TAM'
    },
    {
        name: 'Tlaxcala',
        code: 'TLX'
    },
    {
        name: 'Veracruz',
        code: 'VER'
    },
]

module.exports.getStateCodeByName = (name) => {
    let entidadFederativa
    for(let entidad of entidades) {
        if(entidad.name === name){
            entidadFederativa = entidad
            break
        }
    }
    return entidadFederativa.code
}

module.exports.getStateNameByCode = (code) => {
    let entidadFederativa
    for(let entidad of entidades) {
        if(entidad.code === code) {
            entidadFederativa = entidad
            break
        }
    }
    return entidadFederativa.name
}
