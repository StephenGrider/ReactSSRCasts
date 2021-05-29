import { action } from '@reactmono/app-base-alert';

import {
    FETCH_CURRENT_ADMIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './type';

const { setErrorAlert, setSuccessAlert } = action;

export const fetchCurrentAdmin = () => async (dispatch, getState, {type, resolver}) => {
    try {
        const res = await resolver.get('/me');

        dispatch({
            type: FETCH_CURRENT_ADMIN,
            payload: res
        });
    } catch (err) {
        console.warn('Login Required');
    }
};

export const submitSignIn = (formData) => async (dispatch, getState, {type, resolver}) => {
    try {
        const res = await resolver.post('/signin', formData);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(fetchCurrentAdmin());
    } catch (err) {
        console.error('submitSignIn error: ', err);
        dispatch({
            type: LOGIN_FAIL,
        });

        dispatch(setErrorAlert(`Sign in Error`, 7));
    }
};

export const logout = () => async (dispatch, getState, {type, resolver}) => {
    try {
        await resolver.post('/signout');

        dispatch({
            type: LOGOUT
        });
    } catch (err) {
        console.error('logout error: ', err);
        dispatch(setErrorAlert('Logout Error'));

        dispatch({
            type: LOGOUT
        });
    }
};
