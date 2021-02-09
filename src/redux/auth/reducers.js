import {
    SET_IS_AUTHORIZED,
    SET_AUTH_TOKEN
} from './actionTypes';

export const defaultState = {
    isAuthorized: false,
    authToken: ''
};

export const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_IS_AUTHORIZED:
            return {
                ...state,
                isAuthorized: action.payload.isAuthorized
            };
        case SET_AUTH_TOKEN:
            return {
                ...state,
                authToken: action.payload.authToken
            };
        default:
            return state;
    }
};
