export const FETCH_USER = 'fetch_user';
export const fetchUser = (id) => async (dispatch, getState, {type, resolver}) => {
    const res = await resolver.get(`/user/${id}`);

    dispatch({
        type: FETCH_USER,
        payload: res
    });
};

export const FETCH_NEXT_USER = 'fetch_next_user';
export const fetchNextUser = (id) => async (dispatch, getState, {type, resolver}) => {
    const res = await resolver.get(`/user/${+id+1}`);

    dispatch({
        type: FETCH_NEXT_USER,
        payload: res
    });
};