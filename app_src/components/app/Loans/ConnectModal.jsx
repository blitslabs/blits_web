import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import Web3 from 'web3'

// Actions
import { setProviderStatus } from '../../../actions/shared'

Modal.setAppElement('#root')

class ConnectModal extends Component {

    handleMetamaskBtn = async (e) => {
        e.preventDefault()
        const { dispatch, toggleModal } = this.props

        if (!window.ethereum) {
            // show download metamask modal
            return
        }

        try {
            await window.ethereum.enable()
        } catch (e) {
            console.log(e)
            return
        }

        dispatch(setProviderStatus({ name: 'ethereum', status: true }))
        toggleModal(false)
    }

    handleWalletConnectBtn = async (e) => {
        e.preventDefault()
    }

    render() {

        const { isOpen, toggleModal } = this.props

        return (
            <Modal
                isOpen={isOpen}
                style={customStyles}
            >
                <div className="row" style={{ padding: '20px 50px 10px 50px' }}>
                    <div className="col-12 text-center">
                        <div className="modal-wallet-title mb-4">Select a wallet provider</div>
                        <div className="row ">
                            <div className="col-sm-12 col-md-6 text-center mt-4">
                                <img style={{ height: '48px' }} src={process.env.SERVER_HOST + '/assets/images/metamask.svg'} />
                                <div className="modal-wallet-name mt-2">Metamask</div>
                                <button onClick={this.handleMetamaskBtn} className="btn btn-blits mt-3">Select</button>
                            </div>
                            <div className="col-sm-12 col-md-6 text-center mt-4">
                                <img style={{ height: '48px' }} src={process.env.SERVER_HOST + '/assets/images/wallet-connect.svg'} alt="" />
                                <div className="modal-wallet-name mt-2">WalletConnect</div>
                                <button onClick={this.handleWalletConnectBtn} className="btn btn-blits mt-3">Select</button>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-12 text-center">
                                <button className="btn btn-blits-white" onClick={(e) => { e.preventDefault(); toggleModal(false) }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '25px',
        maxHeight: '100vh',
        width: '450px',
        maxWidth: '100%'
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
}

function mapStateToProps({ shared }) {
    return {
        shared
    }
}

export default connect(mapStateToProps)(ConnectModal)