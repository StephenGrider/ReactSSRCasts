/**
 * Store mapping for data provider key and related method.
 */
class DataProvider {
    constructor () {
        this.method = {};
    }

    set (key, method) {
        this.method[key] = method;
    }

    get (key) {
        return this.method[key];
    }
}

export default DataProvider;
