export const FETCH_CURRENT_ADMIN = 'fetch_current_admin';
export const fetchCurrentAdmin = () => async (dispatch, getState, {type, resolver}) => {
    const res = await resolver.get('/current_admin');
    dispatch({
        type: FETCH_CURRENT_ADMIN,
        payload: res
    });
};
