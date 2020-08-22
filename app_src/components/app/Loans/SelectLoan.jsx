import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Navbar from './Navbar'
import Footer from './Footer'

// Styles
import '../styles.css'

// Actions
import { saveLoanRequestAsset } from '../../../actions/loanRequest'

class SelectLoan extends Component {
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
                                <div className="col-sm-12 ">
                                    <div className="mb-4">
                                        <h2>Select your borrower</h2>
                                        <div className="app-page-subtitle mt-2">Select a borrow request from the following list</div>
                                    </div>
                                    <div className="row mt-5 ">
                                        <div className="col-sm-12 col-md-4 mb-2 text-center">
                                            <div className="app-option-btn shadow-lg">
                                                <div className="row">
                                                    <div className="col-6 text-left">
                                                        <div className="label-title">Loan Principal</div>
                                                        <div className="label-value text-black mt-2">100 DAI</div>

                                                        <div className="label-title">Duration</div>
                                                        <div className="label-value text-black mt-2">90 days</div>
                                                        
                                                    </div>
                                                    <div className="col-6 text-left">
                                                        <div><img src={process.env.SERVER_HOST + '/assets/images/dai_logo.png'} alt="" /></div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6 text-left">
                                                        <div className="label-title">APR</div>
                                                        <div className="label-value text-black mt-2">10% </div>
                                                    </div>
                                                    <div className="col-6 text-left">
                                                        <div className="label-title">Collateralization</div>
                                                        <div className="label-value text-black mt-2">150% </div>
                                                    </div>
                                                </div>
                                                <button className="btn btn-blits mt-4">Lend</button>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-4 mb-2 text-center">
                                            <div className="app-option-btn shadow-lg">
                                                <div className="row">
                                                    <div className="col-6 text-left">
                                                        <div className="label-title">Loan Principal</div>
                                                        <div className="label-value text-black mt-2">100 DAI</div>

                                                        <div className="label-title">Duration</div>
                                                        <div className="label-value text-black mt-2">90 days</div>
                                                        
                                                    </div>
                                                    <div className="col-6 text-left">
                                                        <div><img src={process.env.SERVER_HOST + '/assets/images/dai_logo.png'} alt="" /></div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6 text-left">
                                                        <div className="label-title">APR</div>
                                                        <div className="label-value text-black mt-2">10% </div>
                                                    </div>
                                                    <div className="col-6 text-left">
                                                        <div className="label-title">Collateralization</div>
                                                        <div className="label-value text-black mt-2">150% </div>
                                                    </div>
                                                </div>
                                                <button className="btn btn-blits mt-4">Lend</button>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-4 mb-2 text-center">
                                            <div className="app-option-btn shadow-lg">
                                                <div className="row">
                                                    <div className="col-6 text-left">
                                                        <div className="label-title">Loan Principal</div>
                                                        <div className="label-value text-black mt-2">100 DAI</div>

                                                        <div className="label-title">Duration</div>
                                                        <div className="label-value text-black mt-2">90 days</div>
                                                        
                                                    </div>
                                                    <div className="col-6 text-left">
                                                        <div><img src={process.env.SERVER_HOST + '/assets/images/dai_logo.png'} alt="" /></div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6 text-left">
                                                        <div className="label-title">APR</div>
                                                        <div className="label-value text-black mt-2">10% </div>
                                                    </div>
                                                    <div className="col-6 text-left">
                                                        <div className="label-title">Collateralization</div>
                                                        <div className="label-value text-black mt-2">150% </div>
                                                    </div>
                                                </div>
                                                <button className="btn btn-blits mt-4">Lend</button>
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

export default connect(mapStateToProps)(SelectLoan)