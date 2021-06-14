import loadable from '@loadable/component';

export default [
    {
        component: loadable(() => import(`./page/NotFoundPage`)),
        path: '*',
        sortOrder: 1000
    }
];
