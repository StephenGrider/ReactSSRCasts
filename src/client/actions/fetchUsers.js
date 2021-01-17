export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch, getState, {type, resolver}) => {
    const res = await resolver.get('/users');

    dispatch({
        type: FETCH_USERS,
        payload: res
    });
};

export const FETCH_INNER_USERS = 'fetch_inner_users';
export const fetchInnerUsers = () => async (dispatch, getState, {type, resolver}) => {
    const res = await resolver.get('/inner-users');

    dispatch({
        type: FETCH_INNER_USERS,
        payload: res
    });
};