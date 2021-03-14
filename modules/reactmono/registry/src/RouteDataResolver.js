/**
 * Store mapping for api path and related data provider key.
 */
class RouteDataResolver {
    constructor () {
        this.resolverMap = {};
    }

    set (path, area, dataProviderKey) {
        this.resolverMap[this.getCombineKey(path, area)] = dataProviderKey;
    }

    get (path, area) {
        return this.resolverMap[this.getCombineKey(path, area)];
    }

    getCombineKey (path, area) {
        return `${area}@${path}`;
    }
}

export default RouteDataResolver;
