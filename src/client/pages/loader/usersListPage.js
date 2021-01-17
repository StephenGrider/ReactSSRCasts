import { fetchUsers, fetchInnerUsers } from '../../actions/fetchUsers';

/**
 * User List page SSR data loaders.
 *
 * @param store
 * @return {Promise}
 */
export default (store) => {
    return Promise.all([
        store.dispatch(fetchUsers()),
        store.dispatch(fetchInnerUsers())
    ]);
};
