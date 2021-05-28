export const FETCH_INNER_USERS = 'fetch_inner_users';
export const fetchInnerUsers = () => async (dispatch, getState, {type, resolver}) => {
    const res = await resolver.get('/inner-users');

    dispatch({
        type: FETCH_INNER_USERS,
        payload: res
    });
};
