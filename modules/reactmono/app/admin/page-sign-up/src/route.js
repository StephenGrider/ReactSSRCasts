import loadable from '@loadable/component';

export default [
    {
        component:  /* #__LOADABLE__ */ loadable(() => import(`./SignUpPage`)),
        path: `/signup`,
    }
];
