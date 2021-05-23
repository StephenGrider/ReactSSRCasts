import { fetchUser, fetchNextUser } from '../actions/fetchUser';

/**
 * User page SSR data loaders.
 *
 * @param store
 * @param params
 * @return {Promise}
 */
export default (store, params) => {
    return Promise.all([
        store.dispatch(fetchUser(params.id)),
        store.dispatch(fetchNextUser(params.id))
    ]);
};
