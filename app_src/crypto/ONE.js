import { HarmonyAddress } from '@harmony-js/crypto'

const ONE = {
    isAddressValid: (address) => {
        try {
            return HarmonyAddress.isValidBech32(address)
        } catch (e) {
            return false
        }
    }
}

export default ONE