import loadable from '@loadable/component';

export default [
    {
        component: loadable(() => import(`./AdminsListPage`)),
        path: `/admins`
    }
];
