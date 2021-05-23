/**
 * Loader function generator.
 * Generates loader for array of route data load methods(action creators).
 *
 * Loader function example:
 * export default (store, params) => {
 *    return Promise.all([
 *        store.dispatch(fetchUser(params.id)),
 *        store.dispatch(fetchNextUser(params.id))
 *    ]);
 * };
 *
 * @param methods: function[]
 * @return {function(*, *=): Promise<unknown[]>}
 */
export default (methods) => {
    return (store, params) => {
        return Promise.all(
            methods.map((method) => store.dispatch(method(params)))
        );
    };
};
