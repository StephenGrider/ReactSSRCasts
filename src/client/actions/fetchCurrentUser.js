/**
 * On backend resolver is RenderDataProvider class with get() method available.
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
