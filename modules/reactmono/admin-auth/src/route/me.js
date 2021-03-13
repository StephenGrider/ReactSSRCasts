import { AppConfig, Model } from '@reactmono/registry';
import adminMiddleware from '../middleware';

/**
 * @route GET backend/api/me
 * @desc Get Current Admin User
 */
export default () => {
    let adminApiPath = AppConfig.get('adminApiPath');

    return {
        'path': `${adminApiPath}/me`,
        'method': 'GET',
        'middleware': adminMiddleware.auth,
        'callback': async (req, res, next) => {
            try {
                let Admin = Model.get('admins');
                const admin = await Admin.findById(req.admin.id).select('-password');
                res.json(admin);
            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        }
    };
};
