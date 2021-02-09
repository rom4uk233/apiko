import {
    SET_IS_AUTHORIZED,
    SET_AUTH_TOKEN
} from './actionTypes';

export const setUserIsAuthorizedFlag = (isAuthorized) => ({
    type: SET_IS_AUTHORIZED,
    payload: {isAuthorized},
});

export const setAuthToken = (authToken) => {
    return ({
        type: SET_AUTH_TOKEN,
        payload: {authToken}
    })
};

export const setSavedAuthToken = () => async (dispatch) => {
    const existingTokens = localStorage.getItem('tokens');
    if (existingTokens) {
        dispatch(setAuthToken(existingTokens));
        dispatch(setUserIsAuthorizedFlag(true));
    } else {
        dispatch(setUserIsAuthorizedFlag(false));
    }
};

export default setSavedAuthToken;
