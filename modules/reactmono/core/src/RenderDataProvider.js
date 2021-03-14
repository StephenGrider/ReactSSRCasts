import { DataProvider, RouteDataResolver } from '@reactmono/registry';

/**
 * RenderDataProvider is used for both backend (SSR) and frontend (route callback) data retrieve,
 * utilized registered methods from DataProvider
 * during server side rendering process and RouteDataResolver to define
 * related DataProvider key.
 * RouteDataResolver stores mapping for path -> data provider key
 * DataProvider stores methods for 'data provider key'.
 */
class RenderDataProvider {
    area = '';
    request = {};

    constructor(req, area) {
        this.area = area;
        this.request = req;
    };

    get = async (path) => {
        let dataKey = RouteDataResolver.get(path, this.area);
        console.log('path:', path);
        const dataMethod = DataProvider.get(dataKey);
        const dataResult = await dataMethod(this.request);
        return {
            data: dataResult
        }
    };
}

export default RenderDataProvider;
