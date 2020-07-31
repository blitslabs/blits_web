import { SAVE_USER_DATA } from '../actions/user'

export default function user(state = null, action) {
   
    switch(action.type) {
        case SAVE_USER_DATA:
            return {               
                ...action.userData
            }        
        default:            
            return state
    }
}