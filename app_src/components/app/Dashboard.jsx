import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import DashboardTemplate from './DashboardTemplate'
import ProjectCard from './ProjectCard'

import Loading from '../Loading'

// API
import { getAdminData, getDashboardData } from '../../utils/api'

// Actions
import { saveUserData } from '../../actions/user'

// Libraries
import {
    PieChart, Pie, Sector, Cell, ResponsiveContainer
} from 'recharts';




class Dashboard extends Component {

    state = {

        loading: true
    }

    componentDidMount() {
        const { token, dispatch } = this.props

        document.title = "Dashboard"

        this.setState({
            loading: false
        })
    }

    render() {

        const { loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <div className="row">
                        <div className="col-sm-12 col-md-10 offset-md-1">
                            <div className="row mb-4">
                                <div className="col-12 col-xl-12 grid-margin stretch-card" >
                                    <div className="card overflow-hidden">

                                        <div className="card-body" style={{ backgroundColor: 'white', color: 'white', padding: '0px' }}>
                                            <div className="row m-5" style={{ padding: '1.5rem' }}>
                                                <div className="col-md-3 text-center">
                                                    <img style={{ height: '150px' }} src={process.env.SERVER_HOST + '/assets/images/loading.png'} alt="" />
                                                </div>
                                                <div className="col-md-9 pl-5">
                                                    <div className="light-text" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>¡Hola Usuario!</div>

                                                    <div className="page-title" style={{ fontSize: '1.3rem', fontWeight: 500, color: '#0c1427' }}>Te damos la bienvenida a Fibra Cero.</div>
                                                    <h2 className="page-title" style={{ fontSize: '1.3rem', fontWeight: 500, color: '#0c1427' }}>Completa los datos faltantes para que empieces a invertir</h2>
                                                </div>


                                            </div>
                                            
                                            <div className="row pt-3 pb-5 pl-5 pr-5" style={{background: 'rgb(12 20 39)', padding: '1.5rem'}}>
                                                <div className="col-md-3 col-xs-12">
                                                    <div>
                                                        <div className="mb-3 mt-3"><i className="fa fa-check cirlce-icon" style={{ color: 'white' }}></i></div>
                                                        <div className="subtitle" style={{color: 'white'}}>Crea y confirma tu cuenta</div>
                                                        <div className="light-desc">Registrate y confirma tu correo electrónico</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3 col-xs-12">
                                                    <div>
                                                        <div className="mb-3 mt-3"><i className="fa fa-check cirlce-icon" style={{ color: 'white' }}></i></div>
                                                        <div className="subtitle">Completa tus datos</div>
                                                        <div className="light-desc">Registrate y confirma tu correo electrónico</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3 col-xs-12">
                                                    <div>
                                                        <div className="mb-3 mt-3"><i className="fa fa-check cirlce-icon" style={{ color: 'white' }}></i></div>
                                                        <div className="subtitle">Haz tu primera inversión</div>
                                                        <div className="light-desc">Registrate y confirma tu correo electrónico</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3 col-xs-12">
                                                    <div>
                                                        <div className="mb-3 mt-3"><i className="fa fa-check cirlce-icon" style={{ color: 'white' }}></i></div>
                                                        <div className="subtitle">Diversifica tu portofolio</div>
                                                        <div className="light-desc">Registrate y confirma tu correo electrónico</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <h2 className="section-title">OPORTUNIDADES DE INVERSIÓN </h2>
                                    <div className="title-separator"></div>
                                </div>
                            </div>
                            <div className="row mt-4" >
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-6 offset-md-0 col-lg-4 offset-lg-0 col-xl-3 offset-xl-0 mt-3">
                                            <ProjectCard />
                                        </div>
                                        <div className="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-6 offset-md-0 col-lg-4 offset-lg-0 col-xl-3 offset-xl-0 mt-3">
                                            <ProjectCard />
                                        </div>
                                        <div className="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-6 offset-md-0 col-lg-4 offset-lg-0 col-xl-3 offset-xl-0 mt-3">
                                            <ProjectCard />
                                        </div>
                                        <div className="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-6 offset-md-0 col-lg-4 offset-lg-0 col-xl-3 offset-xl-0 mt-3">
                                            <ProjectCard />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ /*borderBottom: '2px solid #eeeeee',*/ margin: '100px 0px 100px 0px' }}></div>

                            <div className="row" style={{ marginTop: '150px' }}>
                                <div className="col-12">
                                    <h2 className="section-title">CAMPAÑAS FONDEADAS </h2>
                                    <div className="title-separator"></div>
                                </div>
                            </div>
                            <div className="row mt-4 mb-4">
                                <div className="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-6 offset-md-0 col-lg-4 offset-lg-0 col-xl-3 offset-xl-0 mt-3">
                                    <ProjectCard />
                                </div>
                                <div className="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-6 offset-md-0 col-lg-4 offset-lg-0 col-xl-3 offset-xl-0 mt-3">
                                    <ProjectCard />
                                </div>
                                <div className="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-6 offset-md-0 col-lg-4 offset-lg-0 col-xl-3 offset-xl-0 mt-3">
                                    <ProjectCard />
                                </div>
                                <div className="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-6 offset-md-0 col-lg-4 offset-lg-0 col-xl-3 offset-xl-0 mt-3">
                                    <ProjectCard />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardTemplate>
        )
    }
}

function mapStateToProps({ auth }) {
    return {
        token: auth && auth.token
    }
}

export default connect(mapStateToProps)(Dashboard)
