import * as constants from './constants';

const intitalState = {
    todayDate: '',
    success: '',
    fail: ''
}

export default homeReducer = (state = intitalState, action) => {
    switch(action.type) {
        case constants.CHECK_IN_SUCCESS: return {...state, success: true, todayDate: action.payload.date}
        case constants.CHECK_OUT_SUCCESS: return {...state, success: true, todayDate: ''}
        default: return state
    }
}