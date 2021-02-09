import {
    SET_USER_INFO
} from './actionTypes';

export const setUserInfo = (userInfo) => {
    return ({
        type: SET_USER_INFO,
        payload: {userInfo}
    })
};

export default setUserInfo;
