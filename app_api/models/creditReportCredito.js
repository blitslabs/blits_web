module.exports = (sequelize, DataTypes) => {
    return sequelize.define('creditReportCredito', {
        creditReportId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fechaActualizacion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        registroImpugnado: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nombreOtorgante: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cuentaActual: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tipoResponsabilidad: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tipoCuenta: {
            type: DataTypes.STRING,
            allowNull: true
        },   
        tipoCredito: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        claveUnidadMonetaria: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        valorActivoValuacion: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        numeroPagos: {
            type: DataTypes.STRING,
            allowNull: true
        },      
        frecuenciaPagos: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        montoPagar: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        fechaAperturaCuenta: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        fechaUltimoPago: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        fechaUltimaCompra: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        fechaReporte: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        creditoMaximo: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        saldoActual: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        limiteCredito: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        saldoVencido: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        numeroPagosVencidos: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        pagoActual: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        historicoPagos: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        totalPagosReportados: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        peorAtraso: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        fechaPeorAtraso: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        saldoVencidoPeorAtraso: {
            type: DataTypes.STRING,
            allowNull: true
        },

    })
}