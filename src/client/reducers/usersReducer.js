import { FETCH_USERS, FETCH_INNER_USERS } from '../actions/fetchUsers';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {...state, users: action.payload.data};

        case FETCH_INNER_USERS:
            return {...state, innerUsers: action.payload.data};

        default:
            return state;
    }
};