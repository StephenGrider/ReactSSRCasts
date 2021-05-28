import loadable from '@loadable/component';

export default [
    {
        component: loadable(() => import(`./HomePage`)),
        path: `/`,
        exact: true
    }
];
