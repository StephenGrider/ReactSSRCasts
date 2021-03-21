import { fetchUser, fetchNextUser } from '../actions/fetchUser';

/**
 * User page SSR data loaders.
 *
 * @param store
 * @param match
 * @return {Promise}
 */
export default (store, match) => {
    return Promise.all([
        store.dispatch(fetchUser(match.params.id)),
        store.dispatch(fetchNextUser(match.params.id))
    ]);
};
