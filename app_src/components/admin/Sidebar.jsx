import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import {
    Box, Globe, Users, Archive, Truck, Navigation, Map, Star, DollarSign, Link2,
    AlignLeft, Settings, ShoppingCart, CreditCard, Percent, Award, Bell, Phone, Upload

} from 'react-feather';

// Libraries
import { isBrowser, isMobile } from 'react-device-detect';
import onClickOutside from "react-onclickoutside";

// Actions
import { showSidebar, hideSidebar, resetSidebar } from '../../actions/shared'

// API
import { getAdminPermissions } from '../../utils/api'

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

        getAdminPermissions({ token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    this.setState({ permissions: res.payload })
                }
            })
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
        const { permissions } = this.state
        return (
            <Fragment>
                <nav className="sidebar" >
                    <div className="sidebar-header">
                        <Link to="/admin/dashboard" className="sidebar-brand">
                            Crowd<span> Admin</span>
                        </Link>
                        <div className={sidebar ? 'sidebar-toggler active' : 'sidebar-toggler not-active'} onClick={this.handleSidebarToggleBtn}>
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>
                    <div style={{ overflowY: 'scroll', overflowX: 'hidden' }} className="sidebar-body" onMouseEnter={this.handleSidebarHover} onMouseLeave={this.handleSidebarBlur}>
                        <ul className="nav">
                            <li className="nav-item nav-category">Main</li>
                            {
                                permissions.dashboard &&
                                <li className="nav-item">
                                    <Link to={`/admin/dashboard`} className="nav-link">
                                        <Box size="16" />
                                        <span style={{ marginLeft: '15px' }} className="link-title">Dashboard</span>
                                    </Link>
                                </li>
                            }

                            {
                                permissions.globalMap &&
                                <li className="nav-item">
                                    <Link to={`/admin/liveLocations`} className="nav-link">
                                        <Globe size="16" />
                                        <span style={{ marginLeft: '15px' }} className="link-title">Vista Global</span>
                                    </Link>
                                </li>
                            }

                            {
                                permissions.users == 1 || permissions.drivers == 1 || permissions.admins == 1
                                    ? <li className="nav-item nav-category">Cuentas</li>
                                    : null
                            }

                            {
                                permissions.users &&
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="collapse" href="#users" role="button" aria-expanded="false" aria-controls="users">
                                        <Users size="16" />
                                        <span style={{ marginLeft: '15px' }} className="link-title">Usuarios</span>
                                        <i className="link-arrow" data-feather="chevron-down" />
                                    </a>
                                    <div className="collapse" id="users">
                                        <ul className="nav sub-menu">
                                            <li className="nav-item">
                                                <Link to={`/admin/users`} className="nav-link">Todos los Usuarios</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/admin/addUser`} className="nav-link">Añadir Usuario</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            }

                            {
                                permissions.drivers &&
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="collapse" href="#drivers" role="button" aria-expanded="false" aria-controls="drivers">
                                        <i className="fa fa-rocket"></i>
                                        <span style={{ marginLeft: '15px' }} className="link-title">Proyectos</span>
                                        <i className="link-arrow" data-feather="chevron-down" />
                                    </a>
                                    <div className="collapse" id="drivers">
                                        <ul className="nav sub-menu">
                                            <li className="nav-item">
                                                <Link to={`/admin/drivers/1`} className="nav-link">Todos los Conductores</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/admin/addDriver`} className="nav-link">Añadir Conductor</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            }

                            {
                                permissions.admins &&
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="collapse" href="#admins" role="button" aria-expanded="false" aria-controls="admins">
                                        <i className="fa fa-user-shield"></i>
                                        <span style={{ marginLeft: '15px' }} className="link-title">Administradores</span>
                                        <i className="link-arrow" data-feather="chevron-down" />
                                    </a>
                                    <div className="collapse" id="admins">
                                        <ul className="nav sub-menu">
                                            <li className="nav-item">
                                                <Link to={`/admin/adminusers/1`} className="nav-link">Todos los Administradores</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/admin/addAdminUser`} className="nav-link">Añadir Administrador</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            }


                            {/* <li className="nav-item">
                                <a className="nav-link" data-toggle="collapse" href="#administradores" role="button" aria-expanded="false" aria-controls="administradores">
                                    <i className="link-icon" data-feather="user-plus" />
                                    <span className="link-title">Administradores</span>
                                    <i className="link-arrow" data-feather="chevron-down" />
                                </a>
                                <div className="collapse" id="administradores">
                                    <ul className="nav sub-menu">
                                        <li className="nav-item">
                                            <a href="pages/email/inbox.html" className="nav-link">Todos los Administradores</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/email/read.html" className="nav-link">Añadir Administrador</a>
                                        </li>
                                    </ul>
                                </div>
                            </li> */}

                            {/* <li className="nav-item">
                                <a className="nav-link" data-toggle="collapse" href="#usuarios" role="button" aria-expanded="false" aria-controls="usuarios">
                                    <i className="link-icon" data-feather="list" />

                                    <span className="link-title">Cuentas</span>
                                    <i className="link-arrow" data-feather="chevron-down" />
                                </a>
                                <div className="collapse" id="usuarios">
                                    <ul className="nav sub-menu">
                                        <li className="nav-item">
                                            <a href="pages/email/inbox.html" className="nav-link">Todos las Cuentas</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/email/read.html" className="nav-link">Añadir Cuenta</a>
                                        </li>
                                    </ul>
                                </div>
                            </li> */}

                            {
                                permissions.documents &&
                                <Fragment>
                                    <li className="nav-item nav-category">Documentos</li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="collapse" href="#documents" role="button" aria-expanded="false" aria-controls="documents">
                                            <Archive size="16" />
                                            <span style={{ marginLeft: '15px' }} className="link-title">Documentos</span>
                                            <i className="link-arrow" data-feather="chevron-down" />
                                        </a>
                                        <div className="collapse" id="documents">
                                            <ul className="nav sub-menu">
                                                <li className="nav-item">
                                                    <Link to={`/admin/requiredDocuments`} className="nav-link">Todos los Documentos </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to={`/admin/addRequiredDocument`} className="nav-link">Añadir Documento </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </Fragment>
                            }

                           



                           

                            {
                                permissions.wallets == 1 || permissions.finances == 1 || permissions.paymentHistory == 1 || permissions.bankAccounts == 1
                                    ? <li className="nav-item nav-category">Finanzas y Pagos</li>
                                    : null
                            }

                            {
                                permissions.wallets &&
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="collapse" href="#wallets" role="button" aria-expanded="false" aria-controls="wallets">
                                        <i className="fa fa-wallet"></i>
                                        <span style={{ marginLeft: '15px' }} className="link-title">Wallets</span>
                                        <i className="link-arrow" data-feather="chevron-down" />
                                    </a>
                                    <div className="collapse" id="wallets">
                                        <ul className="nav sub-menu">
                                            <li className="nav-item">
                                                <a href={`${process.env.ADMIN_PANEL_HOST}/admin/wallets/USER`} className="nav-link">Wallets Usuarios</a>
                                            </li>
                                            <li className="nav-item">
                                                <a href={`${process.env.ADMIN_PANEL_HOST}/admin/wallets/DRIVER/1`} className="nav-link">Wallets Conductores</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            }

                            {
                                permissions.finances &&
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="collapse" href="#finanzas" role="button" aria-expanded="false" aria-controls="finanzas">
                                        <DollarSign size={16} />
                                        <span style={{ marginLeft: '15px' }} className="link-title">Finanzas</span>
                                        <i className="link-arrow" data-feather="chevron-down" />
                                    </a>
                                    <div className="collapse" id="finanzas">
                                        <ul className="nav sub-menu">
                                            <li className="nav-item">
                                                <Link to={`/admin/revenue/all`} className="nav-link">Ingresos por Viajes</Link>
                                            </li>
                                            {/* <li className="nav-item">
                                                <a href="pages/advanced-ui/sweet-alert.html" className="nav-link">Historial de Viajes</a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/advanced-ui/sweet-alert.html" className="nav-link">Ingresos de Conductores</a>
                                            </li> */}
                                            <li className="nav-item">
                                                <Link to={`/admin/revenue/day`} className="nav-link">Ingresos Diarios</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/admin/revenue/month`} className="nav-link">Ingresos Mensuales</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/admin/revenue/year`} className="nav-link">Ingresos Anuales</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            }

                            {
                                permissions.paymentHistory &&
                                <li className="nav-item">
                                    <Link to={`/admin/txs`} className="nav-link">
                                        <AlignLeft size="16" />
                                        <span style={{ marginLeft: '15px' }} className="link-title">Historial de Pagos</span>
                                    </Link>
                                </li>
                            }

                            {
                                permissions.bankAccounts &&
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="collapse" href="#settlement" role="button" aria-expanded="false" aria-controls="settlement">
                                        <Upload size={16} />
                                        <span style={{ marginLeft: '15px' }} className="link-title">Liquidación de Pagos</span>
                                        <i className="link-arrow" data-feather="chevron-down" />
                                    </a>
                                    <div className="collapse" id="settlement">
                                        <ul className="nav sub-menu">
                                            <li className="nav-item">
                                                <Link to={`/admin/accounts/PENDING`} className="nav-link">Cuentas Pendientes</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/admin/accounts/COMPLETED`} className="nav-link">Cuentas Aprobadas</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/admin/withdraw/PENDING`} className="nav-link">Peticiones de Retiro</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/admin/withdraw/COMPLETED`} className="nav-link">Retiros Aprobados</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            }


                            {
                                permissions.promoCodes || permissions.referrals
                                    ? <li className="nav-item nav-category">Códigos y Recompensas</li>
                                    : null
                            }

                            {
                                permissions.promoCodes &&
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="collapse" href="#promo-codes" role="button" aria-expanded="false" aria-controls="promo-codes">
                                        <Percent size={16} />
                                        <span style={{ marginLeft: '15px' }} className="link-title">Códigos Promocionales</span>
                                        <i className="link-arrow" data-feather="chevron-down" />
                                    </a>
                                    <div className="collapse" id="promo-codes">
                                        <ul className="nav sub-menu">
                                            <li className="nav-item">
                                                <Link to={`/admin/promoCodes`} className="nav-link">Todos los Códigos</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/admin/addPromoCode`} className="nav-link">Añadir Código</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/admin/promoCodeTxs`} className="nav-link">Registros de Uso</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            }

                            {
                                permissions.referrals &&
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="collapse" href="#referidos" role="button" aria-expanded="false" aria-controls="referidos">
                                        <Award size={16} />
                                        <span style={{ marginLeft: '15px' }} className="link-title">Referidos y Recompensas</span>
                                        <i className="link-arrow" data-feather="chevron-down" />
                                    </a>
                                    <div className="collapse" id="referidos">
                                        <ul className="nav sub-menu">
                                            <li className="nav-item">
                                                <Link to={`/admin/rewardTxs`} className="nav-link">Usuarios Recompensados</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/admin/rewardRule`} className="nav-link">Regla de Recompensas</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/admin/referralTxs`} className="nav-link">Usuarios Referidos</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/admin/referralRule`} className="nav-link">Regla de Referidos</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            }

                            {
                                permissions.pushNotifications || permissions.support || permissions.lostItems
                                    ? <li className="nav-item nav-category">Atención al Cliente</li>
                                    : null
                            }

                            {
                                permissions.pushNotifications &&
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="collapse" href="#pushNotifications" role="button" aria-expanded="false" aria-controls="pushNotifications">
                                        <Bell size={16} />
                                        <span style={{ marginLeft: '15px' }} className="link-title">Notificaciones Push</span>
                                        <i className="link-arrow" data-feather="chevron-down" />
                                    </a>
                                    <div className="collapse" id="pushNotifications">
                                        <ul className="nav sub-menu">
                                            <li className="nav-item">
                                                <Link to={`/admin/pushNotifications`} className="nav-link">Todas las Notificaciones</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/admin/addPushNotification`} className="nav-link">Añadir Notificación</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            }

                            {
                                permissions.support &&
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="collapse" href="#soporte" role="button" aria-expanded="false" aria-controls="soporte">
                                        <Phone size={16} />
                                        <span style={{ marginLeft: '15px' }} className="link-title">Soporte</span>
                                        <i className="link-arrow" data-feather="chevron-down" />
                                    </a>
                                    <div className="collapse" id="soporte">
                                        <ul className="nav sub-menu">
                                            <li className="nav-item">
                                                <Link to={`/admin/supportAgents`} className="nav-link">Todos los Agentes</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/admin/addSupportAgent`} className="nav-link">Añadir Agente</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/admin/supportTickets/open`} className="nav-link">Tickets Abiertos</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`/admin/supportTickets/closed`} className="nav-link">Tickets Cerrados</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            }

                           

                            {
                                permissions.businessSettings || permissions.paymentSettings
                                    ? <li className="nav-item nav-category">Configuración</li>
                                    : null
                            }

                            {
                                permissions.businessSettings &&
                                <li className="nav-item">
                                    <Link to={`/admin/settings`} className="nav-link">
                                        <Settings size={16} />
                                        <span style={{ marginLeft: '15px' }} className="link-title">Configuración de Negocio</span>
                                    </Link>
                                </li>
                            }

                            {
                                permissions.paymentSettings &&
                                <li className="nav-item">
                                    <Link to={`/admin/settings/payment`} className="nav-link">
                                        <CreditCard size={16} />
                                        <span style={{ marginLeft: '15px' }} className="link-title">Configuración de Pagos</span>
                                    </Link>
                                </li>
                            }

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
