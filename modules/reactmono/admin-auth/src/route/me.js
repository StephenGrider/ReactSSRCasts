import adminMiddleware from '../middleware';
import { Model } from '@reactmono/registry';

/**
 * @route GET backend/api/me
 * @desc Get Current Admin User
 */
export default () => ({
    'path': `/me`,
    'area': 'admin',
    'method': 'GET',
    'middleware': adminMiddleware.auth,
    'callback': async (req, res, next) => {
        try {
            let Admin = Model.get('admins');
            let admin = await Admin.findById(req.admin.id).select('-password');

            res.json(admin);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
});
