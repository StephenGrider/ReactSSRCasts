import loadable from '@loadable/component';

/**
 * Loadable isn't working correctly for server side rendering if we use if it in npm package.
 * Recommended to avoid loadable usage in npm modules.
 * Expected pages to be processed correctly with loadable and SSR declare routes under app directory.
 * If we use loadable in npm package, loadable comment #__LOADABLE__ is required.
 */
export default [
    {
        component: /* #__LOADABLE__ */ loadable(() => import(`./SignUpPage`)),
        path: `/signup`,
    }
];
