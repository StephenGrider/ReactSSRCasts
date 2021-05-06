import { FETCH_USER } from '../actions/fetchUser';
import { FETCH_NEXT_USER } from '../actions/fetchUser';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_USER:
            return {...state, user: action.payload.data};

        case FETCH_NEXT_USER:
            return {...state, nextUser: action.payload.data};

        default:
            return state;
    }
};
