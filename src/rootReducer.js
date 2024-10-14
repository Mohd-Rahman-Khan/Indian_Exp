import { combineReducers } from "redux";
import loginReducer from './Screen/Login/store';
import HomeReducer from './Screen/Home/store';

export default combineReducers({
    loginReducer,
    HomeReducer,
})