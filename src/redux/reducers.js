import {combineReducers} from 'redux';
import {authReducer} from './auth/reducers'
import {userInfoReducer} from './userInfo/reducers';

export default (state, action) => {
    return appReducer(state, action);
};

const appReducer = combineReducers({
    auth: authReducer,
    userInfo: userInfoReducer
});
