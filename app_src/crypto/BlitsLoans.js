import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import ABI from './ABI'

const BlitsLoans = {
    ETH: {
        getAssetTypeData: async (tokenContractAddress, loansContract) => {

            if (!window.ethereum) {
                return { status: 'ERROR', message: 'No web3 provider detected' }
            }

            // Connect to HTTP Provider
            const web3 = new Web3(window.ethereum)

            // Instantiate Contract
            let contract
            try {
                contract = new web3.eth.Contract(ABI.LOANS.abi, loansContract)
            } catch (e) {
                return { status: 'ERROR', message: 'Error instantiating contract' }
            }

            let assetType, interestRate

            try {
                assetType = await contract.methods.getAssetType(tokenContractAddress).call()
                interestRate = await contract.methods.getAssetInterestRate(tokenContractAddress).call()
            } catch (e) {
                console.log(e)
                return false
            }

            const payload = {
                interestRate: web3.utils.fromWei(interestRate),
                maxLoanAmount: web3.utils.fromWei(assetType.maxLoanAmount),
                minLoanAmount: web3.utils.fromWei(assetType.minLoanAmount),
                multiplierPerPeriod: web3.utils.fromWei(assetType.multiplierPerPeriod),
                baseRatePerPeriod: web3.utils.fromWei(assetType.baseRatePerPeriod),
                enabled: assetType.enabled
            }

            return payload
        },


        createLoan: async (lenderAuto, secretHashB1, secretHashAutoB1, principal, tokenContractAddress, loansContractAddress, aCoinLenderAddress) => {

            if (!window.ethereum) {
                return { status: 'ERROR', message: 'No web3 provider detected' }
            }

            if (!lenderAuto) return { status: 'ERROR', message: 'Missing autolender address' }
            if (!secretHashB1) return { status: 'ERROR', message: 'Missing secretHashB1' }
            if (!secretHashAutoB1) return { status: 'ERROR', message: 'Missing secretHashAutoB1' }
            if (!principal) return { status: 'ERROR', message: 'Missing principal' }
            if (!tokenContractAddress) return { status: 'ERROR', message: 'Missing token address' }
            if (!loansContractAddress) return { status: 'ERROR', message: 'Missing loans contract address' }
            if (!aCoinLenderAddress) return { status: 'ERROR', message: 'Missing lender\'s acoin address ' }

            await window.ethereum.enable()

            // Connect to HTTP Provider
            const web3 = new Web3(window.ethereum)

            // Get Lender account
            const accounts = await web3.eth.getAccounts()
            const lender = accounts[0]

            // Instantiate Contract
            let contract
            try {
                contract = new web3.eth.Contract(ABI.LOANS.abi, loansContractAddress)
            } catch (e) {
                return { status: 'ERROR', message: 'Error instantiating contract' }
            }

            // Instantiate token contract
            let token
            try {
                token = new web3.eth.Contract(ABI.ERC20.abi, tokenContractAddress)
            } catch (e) {
                return { status: 'ERROR', message: 'Error instantiating token contract' }
            }

            let amount = BigNumber(principal)

            // Get Token Balance
            let balance = await token.methods.balanceOf(lender).call()
            balance = BigNumber(web3.utils.fromWei(balance))

            // Check Balance
            if (balance.lt(amount)) {
                return { status: 'ERROR', message: 'Insufficient balance' }
            }

            // Allowance
            let allowance = await token.methods.allowance(lender, loansContractAddress).call()
            allowance = BigNumber(web3.utils.fromWei(allowance))

            if (!allowance || allowance.lt(amount)) {
                return { status: 'ERROR', message: 'Insufficient allowance' }
            }

            amount = web3.utils.toWei(amount.toString())

            // Encode aCoinLenderAddress
            aCoinLenderAddress = web3.utils.toHex(aCoinLenderAddress)

            try {
                const tx = await contract.methods.createLoan(
                    lenderAuto, secretHashB1, secretHashAutoB1,
                    amount, tokenContractAddress, aCoinLenderAddress
                ).send({ from: lender })
                return { status: 'OK', payload: tx }
            } catch (e) {
                return { status: 'ERROR', message: 'Error creating loan' }
            }

        }
    }
}

export default BlitsLoans