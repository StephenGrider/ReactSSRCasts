/**
 * On backend resolver is dataResolver object with get() method available.
 * On frontend resolver - axios instance.
 * type - frontend | backend
 */

export const FETCH_CURRENT_USER = 'fetch_current_user';
export const fetchCurrentUser = () => async (dispatch, getState, {type, resolver}) => {
    const res = await resolver.get('/current_user');
    dispatch({
        type: FETCH_CURRENT_USER,
        payload: res
    });
};

export const FETCH_ADMINS = 'fetch_admins';
export const fetchAdmins = () => async (dispatch, getState, {type, resolver}) => {
    const res = await resolver.get('/admins');
    dispatch({
        type: FETCH_ADMINS,
        payload: res
    });
};
