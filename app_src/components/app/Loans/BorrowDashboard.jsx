import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Navbar from './Navbar'
import Footer from './Footer'

// Styles
import '../styles.css'

// Actions
import { saveAvailableLoans } from '../../../actions/availableLoans'

// API
import { getAvailableLoans } from '../../../utils/api'

// Libraries
import Web3 from 'web3'
import moment from 'moment'
import currencyFormatter from 'currency-formatter'
import BigNumber from 'bignumber.js'
import Particles from 'react-particles-js'

class LenderDashboard extends Component {
    state = {
        loans: '',
        myLoans: '',
        contracts: ''
    }

    componentDidMount() {
        const { dispatch } = this.props

        getAvailableLoans()
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status === 'OK') {
                    dispatch(saveAvailableLoans(res.payload))
                }
            })
    }

    handleViewDetailsBtn = async (loanId) => {
        const { history } = this.props
        history.push('/app/loan/' + loanId)
    }

    render() {

        const { availableLoans } = this.props


        return (
            <Fragment>
                <Particles
                    params={{
                        "particles": {
                            "number": {
                                "value": 200,
                                density: {
                                    enable: false,
                                    value_area: 400
                                }
                            },
                            "color": {
                                "value": "#32CCDD"
                            },
                            opacity: {
                                value: 0.5,
                                random: false,
                                
                              },
                            "size": {
                                "value": 4,
                                "random": true
                            },
                            "move": {
                                "direction": "bottom",
                                "out_mode": "out"
                            },
                            "line_linked": {
                                "enable": false
                            },

                            "interactivity": {
                                "events": {
                                    "onclick": {
                                        "enable": true,
                                        "mode": "repulse"
                                    }
                                },
                                "modes": {
                                    "remove": {
                                        "particles_nb": 10
                                    }
                                }
                            }
                        }
                    }}
                    style={{
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%'

                    }}
                />
                <div className="main">
                    <Navbar />
                    <section className="section " style={{ paddingTop: '10rem' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 col-md-12">

                                    <div className="mb-4 text-left">
                                        <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'black' }}>Borrow | Available Loans</div>
                                        <div style={{ fontSize: '18px', marginTop: '10px' }}>Borrow assets across different blockchains</div>
                                    </div>



                                    {

                                        availableLoans && Object.values(availableLoans).length > 0
                                            ?
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        {/* <th>ID</th> */}
                                                        <th>Amount</th>

                                                        <th>Blockchain</th>
                                                        <th>Repayment</th>
                                                        <th>Interest</th>
                                                        <th>APR</th>
                                                        <th>Duration</th>
                                                        <th>Lender</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        Object.values(availableLoans).map((l, i) => (
                                                            <tr key={i}>
                                                                {/* <td>#{l.blockchainLoanId}</td> */}
                                                                <td style={{ fontWeight: 'bold' }}>{currencyFormatter.format(l.principal, { code: 'USD', symbol: '' })} {l.tokenSymbol}</td>
                                                                <td>{l.blockchain}</td>
                                                                <td>{currencyFormatter.format((parseFloat(l.principal) + parseFloat(l.interest)), { code: 'USD', symbol: '' })} {l.tokenSymbol}</td>
                                                                <td>{currencyFormatter.format(l.interest, { code: 'USD', symbol: '' })} {l.tokenSymbol}</td>
                                                                <td>{parseFloat(BigNumber(l.interest).times(100).div(l.principal).times(12)).toFixed(2)}%</td>
                                                                <td>30 days</td>
                                                                <td><a href={"#"}>{l.lender.substring(0, 4)}...{l.lender.substr(l.lender.length - 4)}</a></td>
                                                                <td>
                                                                    <button onClick={e => { e.preventDefault(); this.handleViewDetailsBtn(l.id) }} className="btn btn-blits" style={{ }}>Borrow</button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                            : <div className="text-center">No available loans found</div>
                                    }


                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </Fragment >
        )
    }
}


function mapStateToProps({ availableLoans }) {
    return {
        availableLoans,
    }
}

export default connect(mapStateToProps)(LenderDashboard)