import {
    SET_USER_INFO
} from './actionTypes';

export const defaultState = {
    userInfo: null
};

export const userInfoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload.userInfo
            };
        default:
            return state;
    }
};
