import loadable from '@loadable/component';

export default [
    {
        component: loadable(() => import(`./page/AdminHomePage`)),
        path: `/`,
        exact: true
    }
];
