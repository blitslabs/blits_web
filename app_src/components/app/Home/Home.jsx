import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../../Loading'
import Navbar from './Navbar'
import Header from './Header'
import Footer from './Footer'

// styles
import '../styles.css'

class Home extends Component {

    state = {
        loading: true
    }

    componentDidMount() {

        setTimeout(() => this.setState({ loading: false }), 1000)
    }

    render() {
        const { loading } = this.state

        // if (loading == true) {            
        //     return <Loading />
        // }

        return (
            <div>
                {this.state.loading ? <Loading /> : null}

                <div className="preloader-main">
                    <div className="preloader-wapper">
                        <svg className="preloader" xmlns="http://www.w3.org/2000/svg" version="1.1" width="600" height="200">
                            <defs>
                                <filter id="goo" x="-40%" y="-40%" height="200%" width="400%">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8" result="goo" />
                                </filter>
                            </defs>
                            <g filter="url(#goo)">
                                <circle className="dot" cx="50" cy="50" r="25" fill="#32ccdd" />
                                <circle className="dot" cx="50" cy="50" r="25" fill="#32ccdd" />
                            </g>
                        </svg>
                        <div>
                            <div className="loader-section section-left"></div>
                            <div className="loader-section section-right"></div>
                        </div>
                    </div>
                </div>
                {/*====== Scroll To Top Area Start ======*/}
                <div id="scrollUp" title="Scroll To Top">
                    <i className="fas fa-arrow-up" />
                </div>
                {/*====== Scroll To Top Area End ======*/}
                <div className="main">

                    <Navbar />
                    <Header />

                    {/* ***** Features Area Start ***** */}
                    <section
                        id="features"
                        className="section features-area style-two overflow-hidden pt-5 "
                        style={{ paddingBottom: '100px', backgroundColor: '#f8f9fa' }}
                    >
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-10 col-lg-7">
                                    {/* Section Heading */}
                                    <div className="section-heading text-center">
                                        <span className="d-inline-block rounded-pill shadow-sm fw-5 px-4 py-2 mb-3">
                                            <i className="far fa-lightbulb text-primary mr-1" />
                                            <span className="text-primary">Ecosystem</span>
                                        </span>

                                        <h2>Products</h2>
                                        <p className="d-none d-sm-block mt-4">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Laborum obcaecati dignissimos quae quo ad iste ipsum officiis
                                            deleniti asperiores sit.
                                        </p>
                                        <p className="d-block d-sm-none mt-4">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Laborum obcaecati.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6 col-lg-4 res-margin">
                                    {/* Image Box */}
                                    <div
                                        className="image-box text-center icon-1 p-5 wow fadeInLeft"
                                        data-wow-delay="0.4s"
                                    >
                                        {/* Featured Image */}
                                        <div className="featured-img mb-3">
                                            <img
                                                className="avatar-sm"
                                                src="assets/images/layers.png"

                                            />
                                        </div>
                                        {/* Icon Text */}
                                        <div className="icon-text">
                                            <h3 className="mb-2">DEFI Wallet</h3>
                                            <p>
                                                Get direct & easy access to DEFI protocols on multiple blockchains.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4 res-margin">
                                    {/* Image Box */}
                                    <div
                                        className="image-box text-center icon-1 p-5 wow fadeInUp"
                                        data-wow-delay="0.2s"
                                    >
                                        {/* Featured Image */}
                                        <div className="featured-img mb-3">
                                            <img
                                                className="avatar-sm"
                                                src="assets/images/atomic_loan_icon.png"

                                            />
                                        </div>
                                        {/* Icon Text */}
                                        <div className="icon-text">
                                            <h3 className="mb-2">Atomic Loans</h3>
                                            <p>
                                                Get liquidity across blockchains without selling your assets.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    {/* Image Box */}
                                    <div
                                        className="image-box text-center icon-1 p-5 wow fadeInRight"
                                        data-wow-delay="0.4s"
                                    >
                                        {/* Featured Image */}
                                        <div className="featured-img mb-3">
                                            <img
                                                className="avatar-sm"
                                                src="assets/images/stablecoin.png"

                                            />
                                        </div>
                                        {/* Icon Text */}
                                        <div className="icon-text">
                                            <h3 className="mb-2">Stablecoin</h3>
                                            <p>
                                                Go from Fiat to DEFI in seconds (Coming soon).
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* ***** Features Area End ***** */}
                    {/* ***** Service Area Start ***** */}
                    <section className="section service-area bg-gray overflow-hidden ptb_100" style={{ backgroundColor: 'white' }}>
                        <div className="container">
                            <div className="row justify-content-between align-items-center">
                                <div className="col-12 col-lg-6 order-2 order-lg-1">
                                    {/* Service Text */}
                                    <div className="service-text pt-4 pt-lg-0">
                                        <h2 className="text-capitalize mb-4">Wallet</h2>


                                        {/* Service List */}
                                        <ul className="service-list">
                                            {/* Single Service */}
                                            <li className="single-service media py-2">
                                                <div className="service-icon pr-4">
                                                    <span>
                                                        <i className="fab fa-buffer" />
                                                    </span>
                                                </div>
                                                <div className="service-text media-body">
                                                    <div className="feature-text mt-3"><span style={{ color: '#32ccdd' }}>Multicoin:</span> Manage your Harmony, Ethereum, HRC20, HRC721, ERC20 & ERC721 Tokens</div>
                                                </div>
                                            </li>
                                            {/* Single Service */}
                                            <li className="single-service media py-2">
                                                <div className="service-icon pr-4">
                                                    <span>
                                                        <i className="fas fa-lock" />
                                                    </span>
                                                </div>
                                                <div className="service-text media-body">
                                                    <div className="feature-text mt-3"><span style={{ color: '#32ccdd' }}>Non-custodial:</span> You never share your private keys so only you control your assets.</div>
                                                </div>
                                            </li>
                                            {/* Single Service */}
                                            <li className="single-service media py-2">
                                                <div className="service-icon pr-4">
                                                    <span>
                                                        <i className="fas fa-burn" />
                                                    </span>
                                                </div>
                                                <div className="service-text media-body">
                                                    <div className="feature-text mt-3"><span style={{ color: '#32ccdd' }}>DEFI:</span> The easiest way to access DEFI protocols across multiple Harmony & Ethereum.</div>
                                                </div>
                                            </li>
                                            {/* Single Service */}

                                        </ul>

                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 order-1 order-lg-2 d-none d-lg-block " >

                                    {/* Service Thumb */}
                                    <div className="service-thumb mx-auto  text-center">
                                        <img style={{ borderRadius: '1.5rem', maxWidth: '80%' }} className="vcenter" src="assets/images/blits3.gif" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* ***** Service Area End ***** */}
                    {/* ***** Discover Area Start ***** */}
                    <section className="section discover-area overflow-hidden ptb_100">
                        <div className="container">
                            <div className="row justify-content-between">
                                <div className="col-12 col-lg-6 order-2 order-lg-1">
                                    {/* Discover Thumb */}
                                    <div className="service-thumb discover-thumb mx-auto pt-5 pt-lg-0">
                                        <img src="assets/images/atomic_loan-3.svg" />
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 order-1 order-lg-2">
                                    {/* Discover Text */}
                                    <div className="discover-text pt-4 pt-lg-0">
                                        <h2 className="pb-4 pb-sm-0">
                                            Atomic Loans
              </h2>
                                        <p className="d-none d-sm-block pt-3 pb-4">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Similique dolor ut iusto vitae autem neque eum ipsam, impedit
                                            asperiores vel cumque laborum dicta repellendus inventore
                                            voluptatibus et explicabo nobis unde.
              </p>
                                        {/* Check List */}
                                        <ul className="check-list">
                                            <li className="py-1">
                                                {/* List Box */}
                                                <div className="list-box media">
                                                    <span className="icon align-self-center">
                                                        <i className="fas fa-check" />
                                                    </span>
                                                    <span className="media-body pl-2">
                                                        Combined with a handful of model sentence structures looks
                                                        reasonable.
                    </span>
                                                </div>
                                            </li>
                                            <li className="py-1">
                                                {/* List Box */}
                                                <div className="list-box media">
                                                    <span className="icon align-self-center">
                                                        <i className="fas fa-check" />
                                                    </span>
                                                    <span className="media-body pl-2">
                                                        Contrary to popular belief, Lorem Ipsum is not simply
                                                        random text.
                    </span>
                                                </div>
                                            </li>
                                            <li className="py-1">
                                                {/* List Box */}
                                                <div className="list-box media">
                                                    <span className="icon align-self-center">
                                                        <i className="fas fa-check" />
                                                    </span>
                                                    <span className="media-body pl-2">
                                                        Sed ut perspiciatis unde omnis iste natus error sit
                                                        voluptatem accusantium.
                    </span>
                                                </div>
                                            </li>
                                            <li className="py-1">
                                                {/* List Box */}
                                                <div className="list-box media">
                                                    <span className="icon align-self-center">
                                                        <i className="fas fa-check" />
                                                    </span>
                                                    <span className="media-body pl-2">
                                                        All the Lorem Ipsum generators on the Internet tend to
                                                        repeat necessary.
                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="icon-box d-flex mt-3">
                                            <div className="service-icon">
                                                <span>
                                                    <i className="fas fa-bell" />
                                                </span>
                                            </div>
                                            <div className="service-icon px-3">
                                                <span>
                                                    <i className="fas fa-envelope-open" />
                                                </span>
                                            </div>
                                            <div className="service-icon">
                                                <span>
                                                    <i className="fas fa-video" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* ***** Discover Area End ***** */}
                    {/* ***** Work Area Start ***** */}
                    <section className="section work-area bg-overlay overflow-hidden ptb_100" style={{ background: 'rgb(0 0 0)' }}>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-lg-6">
                                    {/* Work Content */}
                                    <div className="work-content text-center">
                                        <h2 className="text-white">How do <span style={{ color: '#32ccdd' }}>Atomic Loans</span> Work?</h2>
                                        <p className="text-white my-3 mt-sm-4 mb-sm-5">
                                            Non-custodial Cross-chain loans (Atomic Loans) allow users to borrow/lend assets across different Blockchains
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    {/* Single Work */}
                                    <div className="single-work text-center p-3">
                                        {/* Work Icon */}
                                        <div className="work-icon">
                                            <img
                                                className="avatar-md"
                                                src="assets/img/icon/work/app-blits.png"

                                            />
                                        </div>
                                        <h3 className="text-white py-3">1. Loan Terms</h3>
                                        <p className="text-white">
                                            Select the amount, length and collateralization rate.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4">
                                    {/* Single Work */}
                                    <div className="single-work text-center p-3">
                                        {/* Work Icon */}
                                        <div className="work-icon">
                                            <img
                                                className="avatar-md"
                                                src="assets/img/icon/work/settings-blits.png"

                                            />
                                        </div>
                                        <h3 className="text-white py-3">2. Collaterize your Loan</h3>
                                        <p className="text-white">
                                            Secure your loan with Harmony (ONE) or Ethereum (ETH) directly from your wallet or the web platform.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4">
                                    {/* Single Work */}
                                    <div className="single-work text-center p-3">
                                        {/* Work Icon */}
                                        <div className="work-icon">
                                            <img
                                                className="avatar-md"
                                                src="assets/img/icon/work/download-blits.png"

                                            />
                                        </div>
                                        <h3 className="text-white py-3">3. Withdraw your stablecoin</h3>
                                        <p className="text-white">
                                            Withdraw stablecoins on the Harmony or Ethereum blockchain.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* ***** Work Area End ***** */}



                    {/* ***** FAQ Area Start ***** */}
                    <section className="section faq-area style-two ptb_100">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-10 col-lg-7">
                                    {/* Section Heading */}
                                    <div className="section-heading text-center">
                                        <h2 className="text-capitalize">Frequently asked questions</h2>
                                        <p className="d-none d-sm-block mt-4">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Laborum obcaecati dignissimos quae quo ad iste ipsum officiis
                                            deleniti asperiores sit.
              </p>
                                        <p className="d-block d-sm-none mt-4">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Laborum obcaecati.
              </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center" >
                                <div className="col-12">
                                    {/* FAQ Content */}
                                    <div className="faq-content">
                                        {/* sApp Accordion */}
                                        <div className="accordion" id="sApp-accordion">
                                            <div className="row justify-content-center">
                                                <div className="col-12 col-md-6">
                                                    {/* Single Card */}
                                                    <div className="card border-0">
                                                        {/* Card Header */}
                                                        <div className="card-header bg-inherit border-0 p-0">
                                                            <h2 className="mb-0">
                                                                <button className="btn px-0 py-3" type="button">
                                                                    How to install sApp?
                          </button>
                                                            </h2>
                                                        </div>
                                                        {/* Card Body */}
                                                        <div className="card-body px-0 py-3">
                                                            The point of using Lorem Ipsum is that it has a
                                                            more-or-less normal distribution of letters, as opposed
                                                            to using 'Content here, content here', making it look
                                                            like readable English. Many desktop publishing packages
                                                            and web page editors now use Lorem Ipsum as their
                                                            default model text.
                      </div>
                                                    </div>
                                                    {/* Single Card */}
                                                    <div className="card border-0">
                                                        {/* Card Header */}
                                                        <div className="card-header bg-inherit border-0 p-0">
                                                            <h2 className="mb-0">
                                                                <button className="btn px-0 py-3" type="button">
                                                                    Can I get support from the Author?
                          </button>
                                                            </h2>
                                                        </div>
                                                        {/* Card Body */}
                                                        <div className="card-body px-0 py-3">
                                                            Contrary to popular belief, Lorem Ipsum is not simply
                                                            random text. It has roots in a piece of classical Latin
                                                            literature from 45 BC, making it over 2000 years old.
                                                            Richard McClintock, a Latin professor at Hampden-Sydney
                                                            College in Virginia, looked up one of the more obscure
                                                            Latin words, consectetur, from a Lorem Ipsum passage,
                                                            and going through the cites of the word in classical
                                                            literature, discovered the undoubtable source.
                      </div>
                                                    </div>
                                                    {/* Single Card */}
                                                    <div className="card border-0">
                                                        {/* Card Header */}
                                                        <div className="card-header bg-inherit border-0 p-0">
                                                            <h2 className="mb-0">
                                                                <button className="btn px-0 py-3" type="button">
                                                                    Do you have a free trail?
                          </button>
                                                            </h2>
                                                        </div>
                                                        {/* Card Body */}
                                                        <div className="card-body px-0 py-3">
                                                            It has survived not only five centuries, but also the
                                                            leap into electronic typesetting, remaining essentially
                                                            unchanged. It was popularised in the 1960s with the
                                                            release of Letraset sheets containing Lorem Ipsum
                                                            passages, and more recently with desktop publishing
                                                            software like Aldus PageMaker including versions of
                                                            Lorem Ipsum.
                      </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    {/* Single Card */}
                                                    <div className="card border-0">
                                                        {/* Card Header */}
                                                        <div className="card-header bg-inherit border-0 p-0">
                                                            <h2 className="mb-0">
                                                                <button className="btn px-0 py-3" type="button">
                                                                    How can I edit my personal information?
                          </button>
                                                            </h2>
                                                        </div>
                                                        {/* Card Body */}
                                                        <div className="card-body px-0 py-3">
                                                            Sed ut perspiciatis unde omnis iste natus error sit
                                                            voluptatem accusantium doloremque laudantium, totam rem
                                                            aperiam, eaque ipsa quae ab illo inventore veritatis et
                                                            quasi architecto beatae vitae dicta sunt explicabo. Nemo
                                                            enim ipsam voluptatem quia voluptas sit aspernatur aut
                                                            odit aut fugit, sed quia consequuntur magni dolores eos
                                                            qui ratione voluptatem sequi nesciunt.
                      </div>
                                                    </div>
                                                    {/* Single Card */}
                                                    <div className="card border-0">
                                                        {/* Card Header */}
                                                        <div className="card-header bg-inherit border-0 p-0">
                                                            <h2 className="mb-0">
                                                                <button className="btn px-0 py-3" type="button">
                                                                    Contact form isn't working?
                          </button>
                                                            </h2>
                                                        </div>
                                                        {/* Card Body */}
                                                        <div className="card-body px-0 py-3">
                                                            There are many variations of passages of Lorem Ipsum
                                                            available, but the majority have suffered eration in
                                                            some form, by injected humour, or randomised words which
                                                            don't look even slightly believable. If you are going to
                                                            use a passage of Lorem Ipsum, you need to be sure there
                                                            isn't anything embarrassing hidden in the middle of
                                                            text.
                      </div>
                                                    </div>
                                                    {/* Single Card */}
                                                    <div className="card border-0">
                                                        {/* Card Header */}
                                                        <div className="card-header bg-inherit border-0 p-0">
                                                            <h2 className="mb-0">
                                                                <button className="btn px-0 py-3" type="button">
                                                                    Contact form isn't working?
                          </button>
                                                            </h2>
                                                        </div>
                                                        {/* Card Body */}
                                                        <div className="card-body px-0 py-3">
                                                            There are many variations of passages of Lorem Ipsum
                                                            available, but the majority have suffered eration in
                                                            some form, by injected humour, or randomised words which
                                                            don't look even slightly believable. If you are going to
                                                            use a passage of Lorem Ipsum, you need to be sure there
                                                            isn't anything embarrassing hidden in the middle of
                                                            text.
                      </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row justify-content-center">
                                                <p className="text-body text-center pt-4 fw-5">
                                                    Haven't find suitable answer?{" "}
                                                    <a href="#">Tell us what you need.</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* ***** FAQ Area End ***** */}

                    {/* ***** Download Area Start ***** */}
                    <section className="section download-area overlay-dark overylay-blits ptb_100">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-10 col-lg-8">
                                    {/* Download Text */}
                                    <div className="download-text text-center">
                                        <h2 className="text-white">Coming Soon!</h2>
                                        <p className="text-white my-3 d-none d-sm-block">
                                            Blits Wallet will available on iOS and Android devices. Subscribe to get updates and get early access.
              </p>
                                        <p className="text-white my-3 d-block d-sm-none">
                                            sApp is available for all devices, consectetur adipisicing elit.
                                            Vel neque, cumque. Temporibus eligendi veniam, necessitatibus
                                            aut id labore nisi quisquam.
              </p>
                                        {/* Store Buttons */}
                                        <div className="button-group store-buttons d-flex justify-content-center">
                                            <a href="#">
                                                <img src="assets/img/icon/google-play.png" />
                                            </a>
                                            <a href="#">
                                                <img src="assets/img/icon/app-store.png" />
                                            </a>
                                        </div>
                                        <span className="d-inline-block text-white fw-3 font-italic mt-3">
                                            * Available on iPhone, iPad and all Android devices
              </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* ***** Download Area End ***** */}
                    {/* ***** Subscribe Area Start ***** */}
                    <section className="section subscribe-area ptb_100">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-10 col-lg-7">
                                    <div className="subscribe-content text-center">
                                        <h2>Subscribe to get updates</h2>
                                        <p className="my-4">
                                            By subscribing you will get newsleter, promotions adipisicing
                                            elit. Architecto beatae, asperiores tempore repudiandae saepe
                                            aspernatur unde voluptate sapiente quia ex.
              </p>
                                        {/* Subscribe Form */}
                                        <form className="subscribe-form">
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-lg btn-block">
                                                Subscribe
                </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* ***** Subscribe Area End ***** */}

                    {/*====== Height Emulator Area Start ======*/}
                    <div className="height-emulator d-none d-lg-block" />
                    {/*====== Height Emulator Area End ======*/}


                    <Footer />
                </div>
            </div>

        )
    }
}

function mapStateToProps({ preCreditRequest, preFormController }) {
    return {

    }
}

export default connect(mapStateToProps)(Home)