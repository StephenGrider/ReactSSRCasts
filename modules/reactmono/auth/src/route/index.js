import passport from 'passport';

/**
 * OpenId Auth routes params.
 */
export default () => ([
    {
        'path': '/auth/:method',
        'method': 'GET',
        'middleware': '',
        'callback': (req, res, next) => {
            if (req.user) {
                /**
                 * This will call passport.authenticate('facebook') if the route was /api/auth/facebook
                 * and passport.authenticate('instagram') if the route was /api/auth/instagram
                 */
                passport.authenticate(
                    req.params.method,
                    {
                        scope: ['profile', 'email']
                    }
                )(req, res, next);
            } else {
                passport.authorize(
                    req.params.method,
                    {
                        scope: ['profile', 'email']
                    }
                )(req, res, next);
            }
        },
        'area': 'client'
    },
    {
        'path': '/auth/:method/callback',
        'method': 'GET',
        'middleware': '',
        'callback': (req, res, next) => {
            passport.authenticate(req.params.method, {
                successRedirect: '/',
                failureRedirect: '/signup'
            })(req, res, next);
        },
        'area': 'client'
    },
    {
        'path': '/logout',
        'method': 'GET',
        'middleware': '',
        'callback': (req, res, next) => {
            req.logout();
            res.redirect('/');
        },
        'area': 'client'
    },
    {
        'path': '/current_user',
        'method': 'GET',
        'middleware': '',
        'callback': async (req, res, next) => {
            let currentUser = req.user;
            res.send(currentUser);
        },
        'area': 'client'
    }
]);

