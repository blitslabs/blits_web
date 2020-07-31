import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import {
    Box, Globe, Users, Archive, Truck, Navigation, Map, Star, DollarSign, Link2,
    AlignLeft, Settings, ShoppingCart, CreditCard, Percent, Award, Bell, Phone, Upload, User

} from 'react-feather';

// Libraries
import { isBrowser, isMobile } from 'react-device-detect';
import onClickOutside from "react-onclickoutside";

// Actions
import { showSidebar, hideSidebar, resetSidebar } from '../../actions/shared'



class Sidebar extends Component {

    state = {
        permissions: ''
    }

    componentDidMount() {
        const { token, dispatch } = this.props
        if (isBrowser) {
            dispatch(hideSidebar())
        } else if (isMobile) {
            dispatch(showSidebar())
        }


    }

    handleClickOutside = (e) => {
        const { sidebar, dispatch } = this.props
        if (isMobile && sidebar === true || window.innerWidth <= 990 && sidebar === true) {
            dispatch(hideSidebar())
        }
    }

    handleSidebarToggleBtn = (e) => {
        e.preventDefault()
        const { sidebar, dispatch } = this.props
        if (sidebar === false) {
            document.body.className += ' ' + 'sidebar-folded'
            dispatch(showSidebar())
        } else {
            document.body.className = document.body.className.replace('sidebar-folded', '')
            document.body.className = document.body.className.replace('sidebar-open', '')
            dispatch(hideSidebar())
        }
    }

    handleSidebarHover = (e) => {
        e.preventDefault()
        const { sidebar } = this.props
        sidebar ? document.body.className += ' ' + 'open-sidebar-folded' : null
    }

    handleSidebarBlur = (e) => {
        e.preventDefault()
        const { sidebar } = this.props
        sidebar ? document.body.className = document.body.className.replace('open-sidebar-folded', '') : null
    }

    render() {
        const { sidebar } = this.props

        return (
            <Fragment>
                <nav className="sidebar" >
                    <div className="sidebar-header">
                        <Link to="/admin/dashboard" className="sidebar-brand">
                            Crowd<span> funding</span>
                        </Link>
                        <div className={sidebar ? 'sidebar-toggler active' : 'sidebar-toggler not-active'} onClick={this.handleSidebarToggleBtn}>
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>
                    <div style={{ overflowY: 'scroll', overflowX: 'hidden' }} className="sidebar-body" onMouseEnter={this.handleSidebarHover} onMouseLeave={this.handleSidebarBlur}>
                        <ul className="nav">
                            <li className="nav-item nav-category">Panel Inversionista</li>

                            <li className="nav-item nav-item-bg">
                                <Link to={`/app/dashboard`} className="nav-link">
                                    <Box size="16" />
                                    <span style={{ marginLeft: '15px' }} className="link-title">Invertir</span>
                                </Link>
                            </li>
                            <li className="nav-item nav-item-bg">
                                <Link to={`/app/dashboard`} className="nav-link">
                                    <Box size="16" />
                                    <span style={{ marginLeft: '15px' }} className="link-title">Historial de inversiones</span>
                                </Link>
                            </li>

                            <li className="nav-item nav-item-bg">
                                <Link to={`/app/dashboard`} className="nav-link">
                                    <Box size="16" />
                                    <span style={{ marginLeft: '15px' }} className="link-title">Pagos recibidos</span>
                                </Link>
                            </li>

                            <li className="nav-item nav-item-bg">
                                <Link to={`/admin/liveLocations`} className="nav-link">
                                    <Globe size="16" />
                                    <span style={{ marginLeft: '15px' }} className="link-title">Documentos</span>
                                </Link>
                            </li>


                            <li className="nav-item nav-category">Cuenta</li>
                            <li className="nav-item nav-item-bg">
                                <Link to={`/app/profile`} className="nav-link">
                                    <User size="16" />
                                    <span style={{ marginLeft: '15px' }} className="link-title">Mi Cuenta</span>
                                </Link>
                            </li>
                            <li className="nav-item nav-item-bg">
                                <Link to={`/admin/liveLocations`} className="nav-link">
                                    <Globe size="16" />
                                    <span style={{ marginLeft: '15px' }} className="link-title">Notificaciones</span>
                                </Link>
                            </li>

                            <li className="nav-item nav-item-bg">
                                <Link to={`/app/profile`} className="nav-link">
                                    <User size="16" />
                                    <span style={{ marginLeft: '15px' }} className="link-title">Soporte</span>
                                </Link>
                            </li>

                            <li className="nav-item nav-item-bg">
                                <Link to={`/app/profile`} className="nav-link">
                                    <User size="16" />
                                    <span style={{ marginLeft: '15px' }} className="link-title">FAQ</span>
                                </Link>
                            </li>








                        </ul>
                    </div>
                </nav>

            </Fragment>
        )
    }
}

function mapStateToProps({ sidebar, auth }) {
    return {
        sidebar,
        token: auth && auth.token
    }
}

export default connect(mapStateToProps)(onClickOutside(Sidebar))
