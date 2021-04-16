import {
    FETCH_CURRENT_ADMIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types';

export const fetchCurrentAdmin = () => async (dispatch, getState, {type, resolver}) => {
    try {
        const res = await resolver.get('/me');

        dispatch({
            type: FETCH_CURRENT_ADMIN,
            payload: res
        });
    } catch (err) {
        console.error('fetchCurrentAdmin error: ', err);
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

        dispatch({
            type: LOGOUT
        });
    }
};
