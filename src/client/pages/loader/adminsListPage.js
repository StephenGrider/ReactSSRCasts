import { fetchAdmins } from '../../actions';

export default (store) => {
    return store.dispatch(fetchAdmins());
};
