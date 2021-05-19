import { action as authAction } from '../store/auth';
const { fetchCurrentAdmin } = authAction;

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
