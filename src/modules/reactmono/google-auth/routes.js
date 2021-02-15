import passport from 'passport';

/**
 * Google OpenId Auth routes params.
 */
export default [
    {
        'path': '/api/auth/google',
        'method': 'GET',
        'middleware': '',
        'callback': passport.authenticate(
            'google',
            {
                scope: ['profile', 'email']
            })
    },
    {
        'path': '/api/auth/google/callback',
        'method': 'GET',
        'middleware': passport.authenticate('google'),
        'callback': (req, res, next) => {
            res.redirect('/');
        }
    },
    {
        'path': '/api/logout',
        'method': 'GET',
        'middleware': '',
        'callback': (req, res, next) => {
            req.logout();
            res.redirect('/');
        }
    }
];
