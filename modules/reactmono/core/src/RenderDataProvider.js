import { DataProvider, RouteDataResolver } from '@reactmono/registry';
import { AppConfig } from '@reactmono/registry';
import { matchRoutes } from 'react-router-config';

/**
 * On backend resolver is RenderDataProvider class object with get() method available.
 * DataProvider is used for both backend (SSR) and frontend (route callback) data retrieve,
 * utilized registered (data fetch) methods from DataProvider
 * during server side rendering process and RouteDataResolver to define
 * related DataProvider key.
 * RouteDataResolver stores mapping for 'api path -> data provider key'
 * DataProvider stores methods for 'data provider key' keys. 'data provider key' -> 'some function - () => {}'.
 * This is the key point of Server side rendering implementation.
 * The purpose of this Class is to replicate frontend axios requests from frontend during backend rendering process.
 * At version 0.1.0 RenderDataProvider implements only get() method replacement for backend.
 */
class RenderDataProvider {
    area;
    request;
    apiRoutes;
    isBackendSSR;

    constructor(req, area, apiRoutes) {
        this.request = req;
        this.area = area;
        this.apiRoutes = apiRoutes;
    };

    /**
     * Replacement for axios.get() method on backend server side rendering.
     * Required for SSR implementation on particular route.
     *
     * @see /src/admin/admin.js
     * Frontend axios instance is pass to create store through resolver in storeParams
     * const axiosInstance = axios.create({
     *     baseURL: `/${config.apiRoute}`
     * });
     *
     * const storeParams = {
     *     type: 'frontend',
     *     resolver: axiosInstance
     * }
     *
     * const store = createStore(
     *     reducers,
     *     window.INITIAL_STATE,
     *     applyMiddleware(thunk.withExtraArgument(storeParams))
     * );
     *
     * @see /src/admin/bootstrap/createStore.js
     * Backend - RenderDataProvider is pass instead of axios to create store through resolver in storeParams
     * l7: const dataProvider = new RenderDataProvider(req, 'admin');
     * const storeParams = {
     *     type: 'backend',
     *     resolver: dataProvider
     * }
     *
     * @see /modules/reactmono/test-user/src/route/index.js
     * l6: 'path': '/inner-users',
     * l10: const renderDataProvider = new RenderDataProvider(req, 'client');
     * l15: 'resolver': 'test-user.users'
     *
     * This resolver value will be registered as key for Data provider, like 'client@test-user.users' key.
     * Both axios for frontend requests and RenderDataProvider for backend requests use 'DataProvider'.
     * Technically DataProvider usage is mandatory for backend RenderDataProvider.
     * In the same time route callback used for frontend axios requests
     * can use DataProvider or implement any other additional logic.
     * But for data consistency purpose it's recommended to use DataProvider response for frontend router too.
     */
    get = async (path) => {
        let adminPath = AppConfig.get('adminPath');
        this.isBackendSSR = ['*', `/${adminPath}*`].includes(this.request.route.path);
        console.log('isBackendSSR: ', this.isBackendSSR);

        /**
         * path (api route path) is expected during backend SSR,
         * can be empty when requested from route callback.
         */
        path = this.isBackendSSR ? path : this.request.url;
        let areaApiPath = this.getAreaApiPath();
        if (path.indexOf(areaApiPath) === 0) {
            path = path.replace(areaApiPath, '');
        }

        let pathPattern;
        let params;
        if (!this.isBackendSSR) {
            pathPattern = this.request.route.path;
            params = this.request.params;
        }
        if (this.isBackendSSR && this.apiRoutes) {
            let matchRoutesList = matchRoutes(this.apiRoutes, path);
            let routeMatch = matchRoutesList.find(({match})=> {
                return match.url === path;
            });

            if (routeMatch) {
                pathPattern = routeMatch.match.path;
                params = routeMatch.match.params;
            }
        }

        if (pathPattern && pathPattern.indexOf(areaApiPath) === 0) {
            pathPattern = pathPattern.replace(areaApiPath, '');
        }

        if (!pathPattern) {
            pathPattern = path;
        }

        let dataKey = RouteDataResolver.get(pathPattern, this.area);
        const dataMethod = DataProvider.get(dataKey);
        if (typeof dataMethod !== 'function') {
            return {
                data: null
            };
        }

        const dataResult = await dataMethod(this.request, params);

        return {
            data: dataResult
        }
    };

    getAreaApiPath = () => {
        switch (this.area) {
            case 'client':
                return AppConfig.get('clientApiPath');
            case 'admin':
               return AppConfig.get('adminApiPath');
            default:
                return '';
        }
    }
}

export default RenderDataProvider;
