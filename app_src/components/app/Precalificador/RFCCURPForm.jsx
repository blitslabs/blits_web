import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Actions
import { saveCreditRequest, } from '../../../actions/preCreditRequest'
import { nextFormController, backFormController } from '../../../actions/preFormController'

// Utils
import { calcular } from '../../../utils/calculator'

// Libraries
import moment from 'moment'

class RFCCURPForm extends Component {

    state = {
        curp: '',
        rfc: '',
        curpIsInvalid: false,
        rfcIsInvalid: false,
        curpErrorMsg: 'Este campo es obligatorio.',
        rfcErrorMsg: 'Este campo es obligatorio.',
    }

    componentDidMount() {
        const { creditRequest } = this.props

        let {
            firstName, secondName, lastName, secondLastName, dateOfBirth, gender, entidadNacimiento,
            curp, rfc
        } = creditRequest

        // Prepare data
        dateOfBirth = moment(dateOfBirth).format('YYMMDD')
        gender = gender === 'Hombre' ? 'H' : 'M'
        const nombre = firstName + ' ' + secondName
        let result

        // if (!curp) {
        //     result = calcular(nombre, lastName, secondLastName, dateOfBirth, gender, entidadNacimiento)
        //     curp = result.curp
        // }

        // if (!rfc) {
        //     result = calcular(nombre, lastName, secondLastName, dateOfBirth, gender, entidadNacimiento)
        //     rfc = result.rfc
        // }

        if (firstName && lastName && secondLastName && dateOfBirth && gender && entidadNacimiento) {
            result = calcular(nombre, lastName, secondLastName, dateOfBirth, gender, entidadNacimiento)

            this.setState({
                curp: curp ? curp : result.curp,
                rfc: rfc ? rfc : result.rfc,
                loading: false
            })

            return
        }

        this.setState({ curp: '', rfc: '', loading: false })

    }

    handleRFCChange = (e) => {
        const rfc = e.target.value

        if (rfc.length > 13) return

        if (rfc.length !== 13) {
            this.setState({ rfcIsInvalid: true, rfcErrorMsg: 'El RFC debe contener 13 caracteres' })
        } else {
            this.setState({ rfcIsInvalid: false, rfcErrorMsg: 'Este campo es obligatorio.' })
        }

        this.setState({ rfc })
    }

    handleCURPChange = (e) => {
        const curp = e.target.value

        if (curp.length > 18) return

        if (curp.length !== 18) {
            this.setState({ curpIsInvalid: true, curpErrorMsg: 'El CURP debe contener 18 caracteres' })
        } else {
            this.setState({ curpIsInvalid: false, curpErrorMsg: 'Este campo es obligatorio.' })
        }

        this.setState({ curp })
    }

    handleContinueBtn = (e) => {
        console.log('CONTINUE_BTN')
        e.preventDefault()

        const { curp, rfc, curpIsInvalid, rfcIsInvalid } = this.state
        const { dispatch } = this.props

        // Check PART_2
        if (!curp || !rfc || curpIsInvalid || rfcIsInvalid) {
            console.log('test')
            if (!curp) this.setState({ curpIsInvalid: true })
            if (!rfc) this.setState({ rfcIsInvalid: true })
            return
        }

        // save credit request form
        const params = { curp, rfc }
        dispatch(saveCreditRequest(params))

        // next form controller
        dispatch(nextFormController())
    }

    handleBackBtn = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(backFormController())
    }

    render() {
        const { curp, curpIsInvalid, curpErrorMsg, rfc, rfcIsInvalid, rfcErrorMsg } = this.state

        return (
            <Fragment>
                <div className="form-description mt-2" style={{ color: 'rgb(0, 0, 128)', fontWeight: '400' }}>Por favor escribe de forma precisa los datos solicitados</div>
                <div className="form-description mt-2" style={{ color: 'rgb(0, 0, 128)', fontWeight: '400' }}>Consulta tu CURP en el siguiente enlace: <a href="https://www.gob.mx/curp" target="_blank">https://www.gob.mx/curp</a></div>
                <div className="form-group mt-4">
                    <label className="form-label">CURP<span className="form-required-symbol">*</span></label>
                    <input value={curp} onChange={this.handleCURPChange} type="text" className={curpIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                    <div className="invalid-feedback">
                        {curpErrorMsg}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">RFC<span className="form-required-symbol">*</span></label>
                    <input value={rfc} onChange={this.handleRFCChange} type="text" className={rfcIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                    <div className="invalid-feedback">
                        {rfcErrorMsg}
                    </div>
                </div>
                <div className="text-center " style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="text-center mt-4" style={{ marginRight: '10px' }}>
                        <button onClick={this.handleBackBtn} className="btn btn-light btn-continue">Previa</button>
                    </div>
                    <div className="text-center mt-4">
                        <button onClick={this.handleContinueBtn} className="btn btn-light btn-continue">Próxima página</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps({ preCreditRequest }) {
    return {
        creditRequest: preCreditRequest,
    }
}

export default connect(mapStateToProps)(RFCCURPForm)