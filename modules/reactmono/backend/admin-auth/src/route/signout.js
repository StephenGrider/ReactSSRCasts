import { Model } from '@reactmono/framework-registry';
import adminMiddleware from '../middleware';

/**
 * @route POST backend/api/signout
 * @desc Admin Logout Route
 */
export default () => ({
    'path': `/signout`,
    'area': 'admin',
    'method': 'POST',
    'middleware': adminMiddleware.auth,
    'callback': async (req, res, next) => {
        try {
            let Admin = Model.get('admins');
            let admin = await Admin.findById(req.admin.id).select('-password');

            if (admin.secret !== req.admin.secret) {
                return res.status(401).json({data: {errors: ['Authorization denied, incorrect secret key']}});
            }

            admin.secret = '';
            await admin.save();

            res.status(200).json({data: {message: 'Logout success'}});
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
});
