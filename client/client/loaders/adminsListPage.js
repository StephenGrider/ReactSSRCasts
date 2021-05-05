import { fetchAdmins } from '../actions/fetchAdmins';

export default (store) => {
    return store.dispatch(fetchAdmins());
};
