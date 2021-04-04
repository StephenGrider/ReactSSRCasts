import { requireLogin } from '@reactmono/auth';
import getTestUsers from '../service/testUsers';
import getTestInnerUsers from '../service/testInnerUsers';
import { getAdmins } from '@reactmono/auth';

export default () => ([
    {
        'path': '/users',
        'method': 'GET',
        'middleware': '',
        'callback': async (req, res, next) => {
            let users = await getTestUsers();
            res.send(users);
        },
        'area': 'client'
    },
    {
        'path': '/inner-users',
        'method': 'GET',
        'middleware': '',
        'callback': async (req, res, next) => {
            let innerUsers = await getTestInnerUsers();
            res.send(innerUsers);
        },
        'area': 'client'
    },
    {
        'path': '/user/:id',
        'method': 'GET',
        'middleware': '',
        'callback': async (req, res, next) => {
            res.send(req.params.id);
        },
        'area': 'client'
    },
    {
        'path': '/admins',
        'method': 'GET',
        'middleware': requireLogin,
        'callback': async (req, res, next) => {
            let admins = await getAdmins();
            res.send(admins);
        },
        'area': 'client'
    }
]);
