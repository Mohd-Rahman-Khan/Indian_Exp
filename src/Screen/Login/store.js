
const initialState = {
    userId: '',
}

export default loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'loginData':
            return {...state, userId: action.payload}
        default:
            return state
    }
}