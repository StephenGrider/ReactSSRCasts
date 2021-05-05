import { fetchCurrentAdmin } from '../actions/auth';

/**
 * All pages SSR data loaders.
 *
 * @param store
 * @return {Promise}
 */
export default (store) => {
    return Promise.all([
        store.dispatch(fetchCurrentAdmin()),
    ]);
};
