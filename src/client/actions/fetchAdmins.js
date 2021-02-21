export const FETCH_ADMINS = 'fetch_admins';
export const fetchAdmins = () => async (dispatch, getState, {type, resolver}) => {
    const res = await resolver.get('/admins');
    dispatch({
        type: FETCH_ADMINS,
        payload: res
    });
};
