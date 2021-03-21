import adminMiddleware from '../middleware';
import { RenderDataProvider} from '@reactmono/core';

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
            const renderDataProvider = new RenderDataProvider(req, 'admin');
            let admin = await renderDataProvider.get();
            res.json(admin.data);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    'resolver': 'admin-auth.me'
});
