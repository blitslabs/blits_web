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
    }
}

export default BlitsLoans