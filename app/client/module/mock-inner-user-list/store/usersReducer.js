import { FETCH_INNER_USERS } from './fetchInnerUsers';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_INNER_USERS:
            return {...state, users: action.payload.data};

        default:
            return state;
    }
};
