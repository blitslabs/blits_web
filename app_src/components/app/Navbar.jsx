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

            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                    <div>
                        <a href="#" className="navbar-brand" style={{ marginRight: '0px' }}><img src={process.env.SERVER_HOST + '/app_assets/images/logo.png'} style={{ height: '40px' }} /></a>
                        <div className="slogan" style={{}}>Tu brújula inmobiliaria</div>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">INICIO <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">PARTHNERS</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">SOBRE NOSOTROS</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">CONTACTO</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">PROPUESTAS</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <img style={{ width: '100%' }} src={process.env.SERVER_HOST + '/app_assets/images/header_img.jpg'} />


            </Fragment>

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