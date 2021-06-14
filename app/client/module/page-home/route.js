import loadable from '@loadable/component';

export default [
    {
        component: loadable(() => import(`./page/HomePage`)),
        path: `/`,
        exact: true
    }
];
