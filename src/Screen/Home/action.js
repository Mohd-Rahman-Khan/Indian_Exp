import auth from '../../api/auth'
import * as constants from './constants'

const checkInAction = (payload) => ({
    type: constants.CHECK_IN_SUCCESS,
    payload
})


export const setCheckInGlobal = ( ) => {
    return async (dispatch) => {
        let data = await auth.checkInCheckOut()
        dispatch(checkInAction(data))
    }
}