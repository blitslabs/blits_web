import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../../Loading'
import Footer from '../Footer'
import DashboardTemplate from '../DashboardTemplate'
import CreditTypeForm from './CreditTypeForm'
import ProspectivePropertyValueForm from './ProspectivePropertyValueForm'
// import ClientMonthlyIncomeForm from './ClientMonthlyIncomeForm'
// import ClientMainOccupationForm from './ClientMainOccupationForm'
// import ClientNameForm from './ClientNameForm'
// import ClientCivilStatusForm from './ClientCivilStatusForm'
// import PropertyRegimeForm from './PropertyRegimeForm'
// import ClientRFCForm from './ClientRFCForm'
// import AddressForm from './AddressForm'
// import PhoneForm from './PhoneForm'
// import NipForm from './NipForm'
// import ConfirmNipForm from './ConfirmNipForm'
// import FavorablePrequalification from './FavorablePrequalification'

// Actions
import { setFormID } from '../../../actions/formController'

class Precalificador extends Component {

    state = {

        loading: true
    }

    componentDidMount() {
        const { token, dispatch } = this.props

        document.title = "Precalificador - SwayLending"

        dispatch(setFormID(2))

        this.setState({
            loading: false
        })
    }

    render() {

        const { loading } = this.state
        const { formController } = this.props

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="row p-4" style={{ minHeight: '820px' }}>
                    <div className="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-10 offset-md-1 " >
                        <div className="breadcrumb-title mt-4"><b>Pre-aprobación</b> {'>'} Carga de Documentos {'>'} Propuestas {'>'} Solicitud {'>'} Autorización {'>'} Avalúo {'>'} Firma en Notaría</div>
                        <div style={{ display: 'flex' }}>
                            <div className="page-title mt-3 pt-3">Pre-calificación</div>
                            <img src={process.env.SERVER_HOST + '/app_assets/images/telescopio.png'} style={{ height: '100px' }} />
                        </div>

                        {formController === 1 && <CreditTypeForm />}
                        {formController === 2 && <ProspectivePropertyValueForm />}
                        {
                        /*{ {formController === 3 && <ProspectivePropertyValueForm />}
                        {formController === 4 && <ClientHasProspectivePropertyAmountForm />}
                        {}
                        {formController === 6 && <ClientMainOccupationForm />}
                        {formController === 7 && <ClientNameForm />}
                        {formController === 8 && <ClientCivilStatusForm />}
                        {formController === 9 && <PropertyRegimeForm />}
                        {formController === 10 && <ClientRFCForm />}
                        {formController === 11 && <AddressForm />}
                        {formController === 12 && <PhoneForm />}
                        {formController === 13 && <NipForm />}
                        {formController === 14 && <ConfirmNipForm/>}
                        {formController === 15 && <FavorablePrequalification/>} */}
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
        formController: 'formController' in formController ? formController.formController : 1,
    }
}

export default connect(mapStateToProps)(Precalificador)
