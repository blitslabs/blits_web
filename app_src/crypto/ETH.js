const Web3 = require('web3')
import { sha256 } from '@liquality-dev/crypto'

const ETH = {
    generateSecret: async (message) => {
        if (!window.ethereum) {
            return { status: 'ERROR', message: 'No web3 provider detected' }
        }

        // Connect to HTTP Provider
        const web3 = new Web3(window.ethereum)

        const accounts = await web3.eth.getAccounts()
        const from = accounts[0]

        try {
            // Sign Message
            const signedMessage = await web3.eth.personal.sign(message, from)

            // Generate Secret
            const secret = sha256(signedMessage)

            // Generate Secret Hash
            const secretHash = `0x${sha256(secret)}`

            return { status: 'OK', payload: { secret, secretHash } }
            
        } catch (e) {
            return { status: 'ERROR', message: 'Error signing message' }
        }

    }
}

export default ETH