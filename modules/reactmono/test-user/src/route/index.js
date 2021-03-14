import { requireLogin } from '@reactmono/auth';
import { RenderDataProvider } from '@reactmono/core';

export default () => ([
    {
        'path': '/users',
        'method': 'GET',
        'middleware': '',
        'callback': async (req, res, next) => {
            const renderDataProvider = new RenderDataProvider(req, 'client');
            let users = await renderDataProvider.get('/users');
            res.send(users.data);
        },
        'area': 'client',
        'resolver': 'test-user.users'
    },
    {
        'path': '/inner-users',
        'method': 'GET',
        'middleware': '',
        'callback': async (req, res, next) => {
            const renderDataProvider = new RenderDataProvider(req, 'client');
            let innerUsers = await renderDataProvider.get('/inner-users');
            res.send(innerUsers.data);
        },
        'area': 'client',
        'resolver': 'test-user.inner-users'
    },
    {
        'path': '/admins',
        'method': 'GET',
        'middleware': requireLogin,
        'callback': async (req, res, next) => {
            const renderDataProvider = new RenderDataProvider(req, 'client');
            let admins = await renderDataProvider.get('/admins');
            res.send(admins.data);
        },
        'area': 'client',
        'resolver': 'auth.admins'
    }
]);
