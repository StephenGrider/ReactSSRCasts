import { DataResolver } from '@reactmono/core';
import { requireLogin } from '@reactmono/auth';

export default () => ([
    {
        'path': '/api/users',
        'method': 'GET',
        'middleware': '',
        'callback': (req, res, next) => {
            let dataResolver = new DataResolver(req);
            res.send(dataResolver.get('users').data);
        }
    },
    {
        'path': '/api/inner-users',
        'method': 'GET',
        'middleware': '',
        'callback': (req, res, next) => {
            let dataResolver = new DataResolver(req);
            res.send(dataResolver.get('inner-users').data);
        }
    },
    {
        'path': '/api/admins',
        'method': 'GET',
        'middleware': requireLogin,
        'callback': (req, res, next) => {
            let dataResolver = new DataResolver(req);
            res.send(dataResolver.get('admins').data);
        }
    }
]);
