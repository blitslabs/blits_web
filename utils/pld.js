const catalogoTipoListasPLD = [
    { name: 'QEQ', description: 'PEPs Nacionales', },
    { name: 'PEP', description: 'PEP\'s Nacionales con Familiares y Consanguíneos', },
    { name: 'FUNC', description: 'Funcionarios que trabajan en el Gobierno (No PEP)', },
    { name: 'FAMI', description: 'Familiares de los funcionarios', },
    { name: 'VENC', description: 'Vencidos (Ex PEP más de un año)', },
    { name: 'PEPINT', description: 'PEPs Internacionales', },
    { name: 'HMT', description: 'Her Majesty\'s Treasury', },
    { name: 'ONUAQ', description: 'Lista de Terroristas Al Qaida', },
    { name: 'ICE', description: 'US Immigration and Customs Enforcement', },
    { name: 'DFAT', description: 'Department of Foreign Affairs and Trade', },
    { name: 'ONUTAL', description: 'Lista de Terroristas Talibanes', },
    { name: 'BID', description: 'Banco Interamericano de Desarrollo', },
    { name: 'PGJ', description: 'Procuraduría General de Justicia', },
    { name: 'BM', description: 'Banco Mundial', },
    { name: 'INTP', description: 'Interpol Organización Internacional de Policía Criminal', },
    { name: 'EPA', description: 'Environmental Protection Agency', },
    { name: 'ATF', description: 'Bureau of Alcohol, Tobacco, Firearms and Explosives', },
    { name: 'USMS', description: 'US Marshals Serviciess', },
    { name: 'SSEU', description: 'Secret Service', },
    { name: 'PIS', description: 'Postal Inspection Service', },
    { name: 'OFAC', description: 'Office of Foreingn Assets Control', },
    { name: 'DEA', description: 'Drug Enforcement Administration', },
    { name: 'BIS', description: 'Bureau of Industry and Security', },
    { name: 'BOE', description: 'Bank of England', },
    { name: 'OSFI', description: 'Office of the Superintendent of Financial Institutions', },
    { name: 'PGR', description: 'Procuraduría General de la República', },
    { name: 'LMW', description: 'London Most Wanted', },
    { name: 'UKMW', description: 'United Kingdom Most Wanted', },
    { name: 'SANC', description: 'London Most Wanted', },
    { name: 'SAT69', description: 'PEPs Nacionales', },
    { name: 'SAT69B', description: 'PEPs Nacionales', },
]

function getListasPLD(name) {
    let listas = []
    for (let l of catalogoTipoListasPLD) {
        if (name.includes(l.name)) {
            listas.push(l)
        }
    }
    return listas
}

function getParentesco(code) {
    switch (code) {
        case '01':
            return 'Principal'
        case '02':
            return 'Alias'
        case '03':
            return 'Esposa'
        case '04':
            return 'Hija'
        case '05':
            return 'Hijo'
        default:
            return 'N/A'
    }
}

function getTipoLista(code) {
    switch (code) {
        case '11':
            return 'PEP Nacional'
        case '22':
            return 'PEP Internacional'
        case '33':
            return 'PLD'
        case '44':
            return 'Justicia Nacional'
        default:
            return 'N/A'
    }
}

function getTipoCoincidencia(code) {
    switch (code) {
        case '10':
            return 'Exacto'
        case '99':
            return 'Múltiple'
        default:
            return 'N/A'
    }
}

const PLDCHECK = (label) => {
    const abrevListas = label.substr(0, 6)
    const tipoParentescoCode = label.substr(6, 2)
    const tipoListaCode = label.substr(8, 2)
    const tipoCoincidenciaCode = label.substr(10, 2)
    const fechaConsulta = label.substr(12, 6)

    const coincidenciaListas = getListasPLD(abrevListas)
    const tipoParentesco = getParentesco(tipoParentescoCode)
    const tipoLista = getTipoLista(tipoListaCode)
    const tipoCoincidencia = getTipoCoincidencia(tipoCoincidenciaCode)

    return {
        coincidenciaListas,
        tipoParentesco,
        tipoLista,
        tipoCoincidencia,
        fechaConsulta
    }

}

module.exports = {
    PLDCHECK,
}