// import loadable from '@loadable/component';
import SingUpPage from './page/SignUpPage';

/**
 * Loadable isn't working correctly for server side rendering if we use it in npm package module.
 * Recommended to avoid loadable usage in npm modules.
 * Expected pages to be processed correctly with loadable and SSR declare routes under app directory.
 */
export default [
    {
        // component: /* #__LOADABLE__ */ loadable(() => import(`./page/SignUpPage`)),
        component: SingUpPage,
        path: `/signup`,
    }
];
