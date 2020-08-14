import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../../Loading'

// Actions
import { nextFormController, backFormController } from '../../../actions/preFormController'

const currencyFormatter = require('currency-formatter')

class CreditRequestResult extends Component {
    state = {
        nip: '',
        nipIsInvalid: false,
        nipErrorMsg: 'Este campo es obligatorio.',
    }

    componentDidMount() {
        document.title = "Resultado de la Evaluación | SwayLending"      
        
    }

    handleDownloadBtn = (e) => {
        e.preventDefault()
        const { creditRequest } = this.props
        const URL = process.env.API_HOST + '/creditReport/pdf/' + creditRequest.creditRequestHash

        if(creditRequest.recordFound != 1) {
            return
        }

        window.open(URL, '_blank')
    }

    render() {
        const { creditRequest } = this.props

        if (this.state.loading) {
            return <Loading />
        }

        return (
            <Fragment>
                <div className="mt-2">Nombre completo: <span className="bold">{creditRequest.firstName + ' ' + creditRequest.secondName + ' ' + creditRequest.lastName + ' ' + creditRequest.secondLastName}</span></div>
                <div className="mt-2">RFC: <span className="bold">{creditRequest.rfc}</span></div>
                <div className="mt-2">Resultado: <span className="bold">{creditRequest.resultado}</span></div>
                <div className="mt-2">Monto máximo que puede solicitar: <span className="bold">{creditRequest.montoMaximo}</span></div>
                <div className="mt-2">Para más información agenda una visita en nuestra oficina</div>
                <div className="text-center mt-4 mb-4">
                    <button onClick={this.handleCheckNIPBtn} className="btn btn-light btn-continue">Agendar cita</button>
                </div>

                <div className="mt-2">Visita nuestra oficina en Villahermosa Tab, Plaza Deportiva (MEGA) dentro de la plaza arriba de Starbucks.</div>

                <div className="bold mt-2">Descarga el análisis de tu historial crediticio en el siguiente enlace:</div>

                <div className="text-center mt-4 mb-4">
                    <button onClick={this.handleDownloadBtn} className="btn btn-light btn-continue" >Descargar historial</button>
                </div>

                <div className="bold mb-2">Atte. Equipo Sway Lending</div>

            </Fragment>
        )
    }
}

function mapStateToProps({ preCreditRequest }) {
    return {
        creditRequest: preCreditRequest,
    }
}

export default connect(mapStateToProps)(CreditRequestResult)