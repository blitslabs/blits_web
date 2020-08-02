import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../../Loading'
import CurrencyInput from 'react-currency-input'
import DashboardTemplate from '../DashboardTemplate'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

        maxHeight: '100vh'
    },
    overlay: {
        backgroundColor: '#0000004a'
    },
    parent: {
        overflow: 'hidden',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    editorState: EditorState.createEmpty()
}

class Appraisal extends Component {

    state = {
        markup: '',
        loading: true
    }

    componentDidMount() {
        const { token, dispatch } = this.props

        document.title = "Firma Notaría - SwayLending"

        this.setState({
            loading: false
        })
    }

    onEditorStateChange = (editorState) => {
        const rawContentState = convertToRaw(editorState.getCurrentContent())
        const markup = draftToHtml(
            rawContentState,

        )
        console.log(markup)
        this.setState({
            editorState,
            markup,
        })
    }

    handleEditorChange = (e) => {
        // console.log(e)
    }

    render() {

        const { loading, markup } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="row p-4" style={{ minHeight: '820px' }}>
                    <div className="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-10 offset-md-1 " >
                        <div className="breadcrumb-title mt-4">Pre-aprobación {'>'} Carga de Documentos {'>'} Propuestas {'>'} Solicitud {'>'} Autorización {'>'} Avalúo {'>'} <b>Firma en Notaría</b></div>
                        <div style={{ display: 'flex' }}>
                            <div className="page-title mt-3 pt-3">Firma Notaría</div>
                            <img src={process.env.SERVER_HOST + '/app_assets/images/telescopio.png'} style={{ height: '100px' }} />
                        </div>
                        {/* <div className="page-description">
                            A continuación puedes ver las opciones disponibles de acuerdo a tu perfil elige una opción para continuar tu solicitud, posterior a la conclusión
                            de la solicitud, obtendrás la autorización y la tasa del crédito autorizado.
                        </div> */}
                        <div className="row mt-5">
                            <div className="col-sm-12">
                                <div>{ReactHtmlParser(markup)}</div>

                                <Editor
                                    editorState={this.state.editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                    onChange={this.handleEditorChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardTemplate>
        )
    }
}

function mapStateToProps({ auth, formController, creditRequest }) {
    return {
        token: auth && auth.token,
        creditRequest,
        formController: 'formController' in formController ? formController.formController : 1,
    }
}

export default connect(mapStateToProps)(Appraisal)
