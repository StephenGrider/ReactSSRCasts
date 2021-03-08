import passport from 'passport';
import { DataResolver } from '@reactmono/core';

/**
 * OpenId Auth routes params.
 */
export default () => ([
    {
        'path': '/api/auth/:method',
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
        }
    },
    {
        'path': '/api/auth/:method/callback',
        'method': 'GET',
        'middleware': '',
        'callback': (req, res, next) => {
            passport.authenticate(req.params.method, {
                successRedirect: '/',
                failureRedirect: '/signup'
            })(req, res, next);
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
    },
    {
        'path': '/api/current_user',
        'method': 'GET',
        'middleware': '',
        'callback': (req, res, next) => {
            let dataResolver = new DataResolver(req);
            req.send(dataResolver.get('current_user').data);
        }
    }
]);
