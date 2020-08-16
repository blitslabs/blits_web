import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'


class Header extends Component {
    render() {
        return (

            <section
                id="home"
                className="section welcome-area bg-overlay overflow-hidden d-flex align-items-center"
            >
                <div className="container">
                    <div className="row align-items-center">
                        {/* Welcome Intro Start */}
                        <div className="col-12 col-md-7 col-lg-7">
                            <div className="welcome-intro">
                                <h1 className="">Decentralized Finance for Humans</h1>
                                <p className="page-subtitle my-4">
                                    Borrow, Lend, Exchange, Send, Receive in one place.
                                </p>
                                <div>
                                    <a href="#" className="btn btn-blits">Get Early Access</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-5 col-lg-5">
                            {/* Welcome Thumb */}

                            <div className="welcome-thumb mx-auto">
                                <img className="wow fadeInRight" data-wow-delay='0.4s' style={{visibility:'visible', animationDelay: '0.4s', animationName: 'fadeInRight'}} src="assets/images/wallet1.png" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Shape Bottom */}
            </section>

        )
    }
}

function mapStateToProps({ preCreditRequest, preFormController }) {
    return {

    }
}

export default connect(mapStateToProps)(Header)