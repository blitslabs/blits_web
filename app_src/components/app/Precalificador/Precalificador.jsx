import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from './Loading'
import LeadForm from './LeadForm'
import UserIdentificationForm from './UserIdentificationForm'
import AddressForm from './AddressForm'
import RFCCURPForm from './RFCCURPForm'
import CreditTypeForm from './CreditTypeForm'
import CreditAmountForm from './CreditAmountForm'
import UserIncomeForm from './UserIncomeForm'
import NipForm from './NipForm'
import ConfirmNipForm from './ConfirmNipForm'

// Actions
import { setFormID } from '../../../actions/preFormController'

// API
import { createCreditRequest, checkCreditRequestNIP } from '../../../utils/api'

// Libraries
import { Line } from 'rc-progress'

// styles
import './styles.css'

class Precalificador extends Component {
    state = {
        totalFormSections: 8,
        loading: true,
    }

    componentDidMount() {
        document.title = "Precalificador | SwayLending"
        const { formController, dispatch } = this.props

        // dispatch(setFormID(1))

        this.setState({

            formController,
            loading: false,
        })
    }

    render() {
        const { totalFormSections, loading } = this.state
        const { formController } = this.props
        const progress = (formController / totalFormSections * 100).toFixed(1)

        if (loading === true) {
            return <Loading />
        }

        return (
            <div className="container">
                <div className="row" style={{ marginTop: '80px' }}>
                    <div className="col-xs-10 offset-xs-1 col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                        <div className="card form-container" >

                            <Line percent={progress} strokeWidth="1" strokeColor="#274d00" strokeLinecap="square" />
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 20px 20px' }}>
                                <div className="form-subtitle">
                                    {
                                        formController === 1 ? 'Pre-calificación' :
                                            formController === 2 ? 'Monto del Crédito' :
                                                formController === 3 ? 'Datos Personales' :
                                                    formController === 4 ? 'Confirma tu CURP y RFC' :
                                                        formController === 5 ? 'Dirección' :
                                                            formController === 6 ? 'Tipo de Actividad' :
                                                                formController === 7 ? 'Datos de Contacto' :
                                                                    formController === 8 ? 'Autorización Círculo de Crédito' :
                                                                        formController === 9 ? 'Autorización de Consulta de Historial Crediticio' : ''
                                    }
                                </div>
                                <div className="form-subtitle">{progress}%</div>
                            </div>

                            <img className="card-img-top" src={process.env.SERVER_HOST + '/app_assets/images/banda_hd.jpg'} />
                            <div className="card-body">
                                <div className="form-title" style={{ marginTop: '5px' }}>
                                    {
                                        formController === 1 ? 'Pre-calificador Hipotecario' :
                                            formController === 2 ? 'Monto del Crédito' :
                                                formController === 3 ? 'Datos Personales' :
                                                    formController === 4 ? 'Confirma tu CURP y RFC' :
                                                        formController === 5 ? 'Dirección' :
                                                            formController === 6 ? 'Tipo de Actividad' :
                                                                formController === 7 ? 'Datos de Contacto' :
                                                                    formController === 8 ? 'Autorización Círculo de Crédito' :
                                                                        formController === 9 ? 'Autorización de Consulta de Historial Crediticio' : ''
                                    }
                                </div>
                                <form action="">
                                    {formController === 1 && <CreditTypeForm />}
                                    {formController === 2 && <CreditAmountForm />}
                                    {formController === 3 && <UserIdentificationForm />}
                                    {formController === 4 && <RFCCURPForm />}
                                    {formController === 5 && <AddressForm />}
                                    {formController === 6 && <UserIncomeForm />}
                                    {formController === 7 && <LeadForm />}
                                    {formController === 8 && <NipForm />}
                                    {formController === 9 && <ConfirmNipForm />}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ preCreditRequest, preFormController }) {
    return {
        creditRequest: preCreditRequest,
        formController: 'formController' in preFormController ? preFormController.formController : 1,
    }
}

export default connect(mapStateToProps)(Precalificador)