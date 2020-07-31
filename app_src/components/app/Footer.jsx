import React, { Component, Fragment } from 'react'

class Footer extends Component {
    render() {
        return (
            <footer className="page-footer font-small p-4">
                <div className="row">
                    <div className="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-10 offset-md-1 ">
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <div className="footer-copyright text-left ">2016 - 2020 Sway Lending SAPI de CV © Todos los Derechos Reservados</div>
                            <div>Aviso de Privacidad</div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer