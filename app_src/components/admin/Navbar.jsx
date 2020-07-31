import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { Grid, Users, Truck, Navigation, Upload, Menu } from 'react-feather'

// Actions
import { showSidebar, hideSidebar } from '../../actions/shared'
import { logout } from '../../actions/auth'

class Navbar extends Component {      

    handleNavbarToggleBtn = (e) => {
        e.preventDefault()
        const { sidebar, dispatch } = this.props
        if (sidebar === false) {
            document.body.className += ' ' + 'sidebar-open'
            dispatch(showSidebar())            
        } else {
            document.body.className = document.body.className.replace('sidebar-open', '')
            dispatch(hideSidebar())
        }
    }

    handleLogout = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(logout())
    }

    render() {

        const { user } = this.props

        return (

            < nav className="navbar" >
                <a onClick={this.handleNavbarToggleBtn} href="#" className="sidebar-toggler">
                    <Menu />
                </a>
                <div className="navbar-content">

                    <ul className="navbar-nav">

                        <li className="nav-item dropdown nav-apps">
                            <a className="nav-link dropdown-toggle" href="#" id="appsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <Grid size="16" />
                            </a>
                            <div className="dropdown-menu" aria-labelledby="appsDropdown">
                                <div className="dropdown-header d-flex align-items-center justify-content-between">
                                    <p className="mb-0 font-weight-medium">Atajos</p>
                                </div>
                                <div className="dropdown-body">
                                    <div className="d-flex align-items-center apps">
                                        <a href={`${process.env.ADMIN_PANEL_HOST}/admin/users`}><Users className="icon-lg" /><p>Usuarios</p></a>
                                        <a href={`${process.env.ADMIN_PANEL_HOST}/admin/drivers`}><Truck className="icon-lg" /><p>Conductores</p></a>
                                        <a href={`${process.env.ADMIN_PANEL_HOST}/admin/rides/COMPLETED`}><Navigation className="icon-lg" /><p>Viajes</p></a>
                                        <a href={`${process.env.ADMIN_PANEL_HOST}/admin/withdraw/PENDING`}><Upload className="icon-lg" /><p style={{ textAlign: 'center' }}>Liquidación de Pagos</p></a>
                                    </div>
                                </div>

                            </div>
                        </li>

                        <li className="nav-item dropdown nav-profile">
                            <a className="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src={process.env.SERVER_HOST + '/assets/images/defaultUser.png'} />
                            </a>
                            <div className="dropdown-menu" aria-labelledby="profileDropdown">
                                <div className="dropdown-header d-flex flex-column align-items-center">
                                    <div className="figure mb-3">
                                        <img src={process.env.SERVER_HOST + '/assets/images/defaultUser.png'} />
                                    </div>
                                    <div className="info text-center">
                                        <p className="name font-weight-bold mb-0">{user.name}</p>
                                        <p className="email text-muted mb-3">{user.email}</p>
                                    </div>
                                </div>
                                <div className="dropdown-body">
                                    <ul className="profile-nav p-0 pt-3">
                                        <li className="nav-item">
                                            <a href={`${process.env.ADMIN_PANEL_HOST}/admin/profile`} className="nav-link">
                                                <i data-feather="user" />
                                                <span>Cuenta</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a onClick={this.handleLogout} href="#" className="nav-link">
                                                <i data-feather="log-out" />
                                                <span>Cerrar Sesión</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav >

        )
    }
}

function mapStateToProps({ auth, user, sidebar }) {
    return {
        token: auth && auth.token,
        user,
        sidebar
    }
}

export default connect(mapStateToProps)(Navbar)