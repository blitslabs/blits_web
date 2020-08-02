import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../../Loading'
import DashboardTemplate from '../DashboardTemplate'
import ClientInformationForm from './ClientInformationForm'
import ClientAddressOccupationForm from './ClientAddressOccupationForm'
import CreditParticipantsForm from './CreditParticipantsForm'
import UploadCreditProposals from './UploadCreditProposals'
import CreditRequestInProgress from './CreditRequestInProgress'

// Actions
import { setCreditRequestController } from '../../../actions/formController'

class Precalificador extends Component {

    state = {

        loading: true
    }

    componentDidMount() {
        const { token, dispatch } = this.props

        document.title = "Solicitud de Crédito | Precalificador - SwayLending"
        
        dispatch(setCreditRequestController(5))

        this.setState({
            loading: false
        })
    }

    render() {

        const { loading } = this.state
        const { creditRequestController } = this.props

        if (loading) {
            return <Loading />
        }
        console.log(creditRequestController)
        return (
            <DashboardTemplate>
                <div className="row p-4" style={{ minHeight: '820px' }}>
                    <div className="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-10 offset-md-1 " >
                        <div className="breadcrumb-title mt-4">Pre-aprobación {'>'} Carga de Documentos {'>'} Propuestas {'>'} <b>Solicitud</b> {'>'} Autorización {'>'} Avalúo {'>'} Firma en Notaría</div>
                        <div style={{ display: 'flex' }}>
                            <div className="page-title mt-3 pt-3">Solicitud - Información complementaria</div>
                            <img src={process.env.SERVER_HOST + '/app_assets/images/telescopio.png'} style={{ height: '100px' }} />
                        </div>
                        <div className="page-description">
                            Llena los siguientes datos para continuar
                        </div>

                        {creditRequestController === 1 && <ClientInformationForm />}
                        {creditRequestController === 2 && <ClientAddressOccupationForm/>}
                        {creditRequestController === 3 && <CreditParticipantsForm/>}
                        {creditRequestController === 4 && <UploadCreditProposals/>}
                        {creditRequestController === 5 && <CreditRequestInProgress />}
                        
                    </div>
                </div>
            </DashboardTemplate>
        )
    }
}

function mapStateToProps({ auth, formController, creditRequest }) {
    return {
        token: auth && auth.token,
        creditRequest,
        creditRequestController: 'creditRequestController' in formController ? formController.creditRequestController : 1,
    }
}

export default connect(mapStateToProps)(Precalificador)
