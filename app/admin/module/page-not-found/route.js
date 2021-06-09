import loadable from '@loadable/component';

export default [
    {
        component: loadable(() => import(`./NotFoundPage`)),
        path: '*',
        sortOrder: 1000
    }
];
