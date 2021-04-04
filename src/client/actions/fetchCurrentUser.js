/** Resolver - axios instance injected on store creation */
export const FETCH_CURRENT_USER = 'fetch_current_user';
export const fetchCurrentUser = () => async (dispatch, getState, {type, resolver}) => {
    const res = await resolver.get('/current_user');
    dispatch({
        type: FETCH_CURRENT_USER,
        payload: res
    });
};
