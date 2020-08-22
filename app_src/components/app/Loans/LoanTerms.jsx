import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Navbar from './Navbar'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
// Styles
import '../styles.css'

// Actions
import { saveLoanRequestAsset } from '../../../actions/loanRequest'

class LoanTerms extends Component {
    state = {

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

    render() {

        const { loanRequest } = this.props
        const { requestType } = loanRequest

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
                                        <div className="app-form-label text-black">1. Amount to Lend</div>
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" placeholder="Amount" />
                                            <div className="input-group-append">
                                                <span className="input-group-text">DAI</span>
                                            </div>
                                        </div>
                                        <div className="text-right text-black">Min: 20 | Max: 100 </div>


                                        <div className="app-form-label text-black mt-4">2. Select required collateral amount</div>
                                        <div className="mt-3">
                                            <Slider />
                                        </div>
                                        <div className="text-right text-black mt-3">Min: 20 | Max: 100 </div>

                                        <div className="app-form-label text-black mt-4">3. Annual Percentage Rate</div>
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" placeholder="APR" />
                                            <div className="input-group-append">
                                                <span className="input-group-text">%</span>
                                            </div>
                                        </div>
                                        <div className="text-right text-black">Min: 1% | Max: 30% </div>


                                        <div className="app-form-label text-black mt-4">4. Loan duration</div>
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" placeholder="Days" />
                                            <div className="input-group-append">
                                                <span className="input-group-text">DAYS</span>
                                            </div>
                                        </div>
                                        <div className="text-right text-black">Min: 1 | Max: 30 </div>

                                        <div className="row">
                                            <div className="col-sm-12 col-md-5 offset-md-1">
                                                <button className="btn btn-blits-white mt-4" style={{width: '100%'}}>Back</button>
                                            </div>
                                            <div className="c0l-sm-12 col-md-5">
                                                <button className="btn btn-blits mt-4" style={{width: '100%'}}>Next</button>
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