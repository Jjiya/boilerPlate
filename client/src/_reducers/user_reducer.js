import {LOGIN_USER} from '../_actions/types'

// reduce는 (전의 상태, 현재) 을 통해 nextState로 가게함
export default function(state = {},action){
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
            break;
    
        default:
            return state;
    }
}