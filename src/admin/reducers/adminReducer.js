import { FETCH_CURRENT_ADMIN } from '../actions/fetchCurrentAdmin';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_CURRENT_ADMIN:
            return action.payload.data || false;
        default:
            return state;
    }
}
