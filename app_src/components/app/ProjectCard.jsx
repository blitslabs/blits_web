import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { AnimateOnChange } from 'react-animation'



class ProjectCard extends Component {



    render() {



        return (
            
            <div className="card overflow-hidden" >

                <div className="card-header" >
                    <div style={{fontSize:'1.6em', fontWeight:'bold'}}>Ernestina Etapa 2</div>
                    <div>Campaña 2 • Por Ztudio Arquitectura </div>
                </div>
                <div style={{ backgroundColor: '#007bff', color: 'white', textAlign: 'center',fontSize:'1.0em', fontWeight:'300' }}>
                    Deuda 
                </div>
                <div style={{ height: '200px', backgroundSize: 'cover', backgroundImage: 'url("https://files.briq.mx/uploads/project/photo/230/thumb_Captura_de_pantalla_2020-06-01_a_la_s__11.30.55.png")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center'  }}>
                </div>
                <div>
                    <div className="progress" style={{ borderRadius: '0px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: '25%', }}>25%</div>
                    </div>
                </div>
                <div className="row justify-content-space-evenly" style={{ padding: '10px 36px 5px 36px', borderBottom: '1px solid #eeeeee' }}>
                    <div className="col-5 property-card-sm" style={{ fontWeight: 'bold' }}>
                        $1.4MM recaudado
                        </div>
                    <div className="col-3 property-card-sm" >
                        Min $2.5MM
                        </div>
                    <div className="col-4 property-card-sm">
                        Max. $3MM
                        </div>
                </div>
                <div className="card-body" style={{ paddingTop: '10px' }}>

                    {/* <div className="row ">
                        <div className="col-6 property-card-sm" style={{paddingLeft:'0.75rem'}}>
                            <div>Monto conseguido</div>
                            <div>$1.4MM</div>
                        </div>
                        <div className="col-6 property-card-sm" >
                            <div>Monto meta</div>
                            <div>$78.8MM</div>
                        </div>                        
                    </div> */}

                    <div className="row" style={{ borderBottom: '1px solid #eeeeee', paddingBottom: '2px' }}>
                        <div className="col-6" style={{ fontSize: '14px', color: '#636f7b' }}>
                            <div>Tasa anual fija</div>
                            <div style={{ fontWeight: 'bold', color: '#007bff', fontSize: '20px' }}>14.00%</div>
                        </div>
                        <div className="col-6">
                            <div style={{ fontSize: '14px', color: '#636f7b' }}>Evaluación:</div>
                            <div style={{ fontWeight: 'bold', color: '#007bff', fontSize: '18px' }}>4.1 / 5</div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-6" style={{ fontSize: '14px', color: '#636f7b' }}>Minimo de inersion</div>
                        <div className="col-6" style={{ fontSize: '14px', fontWeight: '900' }}>$1,000</div>
                    </div>
                    <div className="row" style={{borderBottom: '1px solid #eeeeee',  paddingBottom: '5px'}}>
                        <div className="col-6" style={{ fontSize: '14px', color: '#636f7b' }}>Plazo</div>
                        <div className="col-6" style={{ fontSize: '14px', fontWeight: '900' }}>Entre 3 y 24 meses</div>
                    </div>
                    <div className="row justify-content-center mt-4">
                        <div className="col-12 text-center">
                            <div style={{ fontWeight: 'bold', fontSize: '16px', }}>Quedan 24 dias para invertir</div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-6">
                            <button style={{ borderRadius: '.125rem', fontSize: '1.2em' }} type="button" className="btn btn-outline-primary btn-block app-btn mb-1 mb-md-0">Ver +Info</button>
                        </div>
                        <div className="col-6">
                            <button style={{ borderRadius: '.125rem', fontSize: '1.2em' }} type="button" className="btn btn-primary btn-block app-btn mb-1 mb-md-0">
                                Invertir
                               
                            </button>
                        </div>
                    </div>
                </div>
            </div >
            
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

export default connect(mapStateToProps)(ProjectCard)