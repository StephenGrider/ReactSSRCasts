import passport from 'passport';
import { DataResolver } from '@reactmono/core';

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
];
