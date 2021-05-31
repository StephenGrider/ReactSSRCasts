import loadable from '@loadable/component';

export default [
    {
        component: loadable(() => import(`./NotFoundPage`)),
        sortOrder: 1000
    }
];
