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
    }, {
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
    for (let entidad of entidades) {
        if (entidad.name === name) {
            entidadFederativa = entidad
            break
        }
    }
    return entidadFederativa.code
}

module.exports.getStateNameByCode = (code) => {
    let entidadFederativa
    for (let entidad of entidades) {
        if (entidad.code === code) {
            entidadFederativa = entidad
            break
        }
    }
    return entidadFederativa.name
}


const CatalogoTipoCredito = [
    { clave: 'AA', tipoContrato: 'Arrendamiento Automotriz' },
    { clave: 'AB', tipoContrato: 'Automotriz Bancario' },
    { clave: 'AE', tipoContrato: 'Física Actividad Empresarial' },
    { clave: 'AM', tipoContrato: 'Aparatos/Muebles' },
    { clave: 'AR', tipoContrato: 'Arrendamiento' },
    { clave: 'AV', tipoContrato: 'Aviación' },
    { clave: 'BC', tipoContrato: 'Banca Comunal' },
    { clave: 'BL', tipoContrato: 'Bote/Lancha' },
    { clave: 'BR', tipoContrato: 'Bienes Raíces' },
    { clave: 'CA', tipoContrato: 'Compra De Automóvil' },
    { clave: 'CC', tipoContrato: 'Crédito Al Consumo' },
    { clave: 'CF', tipoContrato: 'Crédito Fiscal' },
    { clave: 'CO', tipoContrato: 'Consolidación' },
    { clave: 'CP', tipoContrato: 'Crédito Personal Al Consumo' },
    { clave: 'ED', tipoContrato: 'Editorial' },
    { clave: 'EQ', tipoContrato: 'Equipo' },
    { clave: 'FF', tipoContrato: 'Fondeo Fira' },
    { clave: 'FI', tipoContrato: 'Fianza' },
    { clave: 'GS', tipoContrato: 'Grupo Solidario' },
    { clave: 'HB', tipoContrato: 'Hipotecario Bancario' },
    { clave: 'HE', tipoContrato: 'Préstamo Tipo Home Equity' },
    { clave: 'HV', tipoContrato: 'Hipotecario ó Vivienda' },
    { clave: 'LC', tipoContrato: 'Línea de Crédito' },
    { clave: 'MC', tipoContrato: 'Mejoras a la Casa' },
    { clave: 'NG', tipoContrato: 'Préstamo No Garantizado' },
    { clave: 'PB', tipoContrato: 'Préstamo Personal Bancario' },
    { clave: 'PC', tipoContrato: 'Procampo' },
    { clave: 'PE', tipoContrato: 'Préstamo Para Estudiante' },
    { clave: 'PG', tipoContrato: 'Préstamo Garantizado' },
    { clave: 'PQ', tipoContrato: 'Préstamo Quirografario' },
    { clave: 'PM', tipoContrato: 'Préstamo Empresarial' },
    { clave: 'PN', tipoContrato: 'Préstamo de Nómina' },
    { clave: 'PP', tipoContrato: 'Préstamo Personal' },
    { clave: 'SH', tipoContrato: 'Segunda Hipoteca' },
    { clave: 'TC', tipoContrato: 'Tarjeta De Crédito' },
    { clave: 'TD', tipoContrato: 'Tarjeta Departamental' },
    { clave: 'TG', tipoContrato: 'Tarjeta Garantizada' },
    { clave: 'TS', tipoContrato: 'Tarjeta De Servicios' },
    { clave: 'VR', tipoContrato: 'Vehículo Recreativo' },
    { clave: 'OT', tipoContrato: 'Otros' },
    { clave: 'NC', tipoContrato: 'Desconocido' },
]

const CatalogoTipoCuenta = [
    { clave: 'F', tipoCuenta: 'Pagos fijos' },
    { clave: 'H', tipoCuenta: 'Hipoteca' },
    { clave: 'L', tipoCuenta: 'Sin límite preestablecido' },
    { clave: 'R', tipoCuenta: 'Revolvente' },
    { clave: 'Q', tipoCuenta: 'Quirografario' },
    { clave: 'A', tipoCuenta: 'Crédito de habilitación o avío' },
    { clave: 'E', tipoCuenta: 'Crédito refaccionario' },
    { clave: 'P', tipoCuenta: 'Crédito prendario' },
]


module.exports.getTipoCreditoByClave = (clave) => {
    let tipoCredito = clave
    for (let c of CatalogoTipoCredito) {
        if (c.clave === clave) {
            tipoCredito = c
            break
        }
    }
    return typeof tipoCredito != undefined ? tipoCredito.tipoContrato : clave
}

module.exports.getTipoCuentaByClave = (clave) => {
    let tipoCuenta
    for (let c of CatalogoTipoCuenta) {
        if (c.clave === clave) {
            tipoCuenta = c
            break
        }
    }
    return tipoCuenta.tipoCuenta
}

const CatalogoTipoResponsabilidad = [
    { code: 'I', description: 'Individual(Titular)'},
    { code: 'M', description: 'Mancomunado'},
    { code: 'O', description: 'Obligatorio Solidario'},
    { code: 'A', description: 'Aval'},
    { code: 'T', description: 'Titular con Aval'},
]

module.exports.getTipoResponsabilidad = (code) => {
    let tipoResponsabilidad
    for(let r of CatalogoTipoResponsabilidad) {
        if(r.code == code) {
            tipoResponsabilidad = r
            break
        }
    }
    return tipoResponsabilidad.description
}