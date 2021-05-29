export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch, getState, {type, resolver}) => {
    const res = await resolver.get('/users');

    dispatch({
        type: FETCH_USERS,
        payload: res
    });
};
