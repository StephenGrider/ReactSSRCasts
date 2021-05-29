import { FETCH_USERS } from './fetchUsers';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {...state, users: action.payload.data};

        default:
            return state;
    }
};