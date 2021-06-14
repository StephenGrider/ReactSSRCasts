## ReactMono module PageSignUp

Sign Up mock page with route implemented as npm module.
The main idea these npm modules can be used as npm packages and loaded from npm modules repository.
Current placement under modules/reactmono/app/admin/page-sign-up is just local path for future npm modules.

The Main Problem - we cannot provide code splitting for loadable page used in npm package.
We still can use regular react component page without loadable usage so without webpack code splitting.
Expected git submodules usage will resolve loadable components SSR code splitting issue. 
