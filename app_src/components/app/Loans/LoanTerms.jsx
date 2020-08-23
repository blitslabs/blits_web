import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Navbar from './Navbar'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
// Styles
import '../styles.css'

// Actions
import { saveLoanRequestTerms } from '../../../actions/loanRequest'

class LoanTerms extends Component {
    state = {
        amount: '',
        amountIsInvalid: false,
        amountErrorMsg: 'This field is required',
        collateralizationRatio: 150,
        apr: '',
        aprIsInvalid: false,
        aprErrorMsg: 'This field is required',
        duration: '',
        durationIsInvalid: false,
        durationErrorMsg: 'This field is required'
    }

    componentDidMount() {
        const { loanRequest, history } = this.props
        const { requestType } = loanRequest
        document.title = requestType === 'borrow' ? 'Select Asset to Borrow | Blits' : 'Select Asset to Lend | Blits'
        if (!loanRequest.requestType) {
            history.push('/app/loans')
        }
    }

    handleOptionClick = (option) => {
        const { loanRequest, dispatch, history } = this.props
        dispatch(saveLoanRequestAsset(option))
        const r = loanRequest.requestType === 'borrow' ? '/app/borrow/new' : '/app/lend/new'
        history.push(r)
    }

    handleAmountChange = (e) => {
        const amount = e.target.value
        if (amount < 20 || amount > 100) {
            this.setState({ amountIsInvalid: true, amountErrorMsg: 'Enter a valid amount' })
        } else {
            this.setState({ amountIsInvalid: false, amountErrorMsg: 'This field is required' })
        }

        this.setState({ amount })
    }

    handleCRateChange = (e) => this.setState({ collateralizationRatio: e })

    handleAPRChange = (e) => {
        const apr = e.target.value
        if (apr < 1 || apr > 30) {
            this.setState({ aprIsInvalid: true, aprErrorMsg: 'Enter a valid amount' })
        } else {
            this.setState({ aprIsInvalid: false, aprErrorMsg: 'This field is required' })
        }

        this.setState({ apr })
    }

    handleDurationChange = (e) => {
        const duration = e.target.value
        if (duration < 1 || duration > 30) {
            this.setState({ durationIsInvalid: true, durationErrorMsg: 'Enter a valid amount' })
        } else {
            this.setState({ durationIsInvalid: false, durationErrorMsg: 'This field is required' })
        }

        this.setState({ duration })
    }

    handleContinueBtn = (e) => {
        e.preventDefault()
        const { amount, collateralizationRatio, apr, duration } = this.state
        const { dispatch, history } = this.props

        if (!amount || !collateralizationRatio || !apr || !duration) {
            if (!amount) this.setState({ amountIsInvalid: true })
            if (!apr) this.setState({ aprIsInvalid: true })
            if (!duration) this.setState({ durationIsInvalid: true })
            return
        }

        const params = {
            amount, collateralizationRatio, apr, duration,
        }

        dispatch(saveLoanRequestTerms(params))
        history.push('/app/lend/confirm')
    }

    handleBackBtn = (e) => {
        e.preventDefault()
        this.props.history.push('/app/loans/select-asset')
    }

    render() {

        const { loanRequest } = this.props
        const { asset } = loanRequest

        return (
            <Fragment>
                <div className="main">
                    <Navbar />
                    <section className="section app-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 col-md-8 offset-md-2">
                                    <div className="mb-4 text-center">
                                        <h2>Enter the Loan Terms</h2>
                                        <div className="app-page-subtitle mt-2">Select a borrow request from the following list</div>
                                    </div>
                                    <div className="app-card shadow-lg">
                                        <div className="form-group">
                                            <div className="app-form-label text-black">1. Amount to Lend</div>
                                            <div className="input-group mb-3">
                                                <input value={this.state.amount} onChange={this.handleAmountChange} type="number" className={this.state.amountIsInvalid ? "form-control is-invalid" : "form-control"} placeholder="Amount" />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">{asset.toUpperCase()}</span>
                                                </div>
                                                <div className="invalid-feedback">
                                                    {this.state.amountErrorMsg}
                                                </div>
                                            </div>
                                            <div className="text-right text-black">Min: 20 | Max: 100 </div>

                                        </div>

                                        <div className="app-form-label text-black mt-4">2. Select required collateral amount</div>
                                        <div className="mt-3">
                                            <Slider min={100} max={200} step={10} value={this.state.collateralizationRatio} onChange={this.handleCRateChange} />
                                        </div>
                                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <div className="text-black mt-3">Value: {this.state.collateralizationRatio}</div>
                                            <div className="text-black mt-3">Min: 100% | Max: 200% </div>
                                        </div>

                                        <div className="app-form-label text-black mt-4">3. Annual Percentage Rate</div>
                                        <div className="input-group mb-3">
                                            <input value={this.state.apr} onChange={this.handleAPRChange} type="number" className={this.state.aprIsInvalid ? "form-control is-invalid" : "form-control"} placeholder="APR" />
                                            <div className="input-group-append">
                                                <span className="input-group-text">%</span>
                                            </div>
                                            <div className="invalid-feedback">
                                                {this.state.aprErrorMsg}
                                            </div>
                                        </div>
                                        <div className="text-right text-black">Min: 1% | Max: 30% </div>


                                        <div className="app-form-label text-black mt-4">4. Loan duration</div>
                                        <div className="input-group mb-3">
                                            <input value={this.state.duration} onChange={this.handleDurationChange} type="number" className={this.state.durationIsInvalid ? "form-control is-invalid" : "form-control"} placeholder="Days" />
                                            <div className="input-group-append">
                                                <span className="input-group-text">DAYS</span>
                                            </div>
                                            <div className="invalid-feedback">
                                                {this.state.durationErrorMsg}
                                            </div>
                                        </div>
                                        <div className="text-right text-black">Min: 1 | Max: 30 </div>

                                        <div className="row">
                                            <div className="col-sm-12 col-md-5 offset-md-1">
                                                <button onClick={this.handleBackBtn} className="btn btn-blits-white mt-4" style={{ width: '100%' }}>Back</button>
                                            </div>
                                            <div className="c0l-sm-12 col-md-5">
                                                <button onClick={this.handleContinueBtn} className="btn btn-blits mt-4" style={{ width: '100%' }}>Next</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </Fragment>
        )
    }
}


function mapStateToProps({ loanRequest }) {
    return {
        loanRequest,
    }
}

export default connect(mapStateToProps)(LoanTerms)