import loadable from '@loadable/component';

export default [
    {
        component: loadable(() => import(`./AdminHomePage`)),
        path: `/`,
        exact: true
    }
];
