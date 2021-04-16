import bcrypt from 'bcryptjs';
import config from 'config';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Model } from '@reactmono/registry';
import secretGen from '../service/secretGen';

/**
 * @route POST backend/api/signin
 * @desc Admin Authentication Route / Login
 */
export default () => ({
    'path': `/signin`,
    'area': 'admin',
    'method': 'POST',
    'middleware': [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    'callback': async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {email, password} = req.body;

        try {
            let Admin = Model.get('admins');
            let admin = await Admin.findOne({email});

            if (!admin) {
                return res.status(400).json({
                    errors: [{ msg: 'Invalid Credentials' }]
                });
            }

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(400).json({
                    errors: [{ msg: 'Invalid Credentials' }]
                });
            }

            // Pass additional secret in token payload
            let secretKey = secretGen();

            // Return jsonwebtoken
            const payload = {
                admin: {
                    id: admin.id,
                    secret: secretKey
                }
            };

            let adminSessionTime = parseInt(config.get('adminSessionTime'));
            let jwtSecret = config.get('jwtSecret');

            jwt.sign(
                payload,
                jwtSecret,
                {expiresIn: adminSessionTime},
                async (err, token) => {
                    if (err) {
                        throw err;
                    }
                    admin.secret = secretKey;
                    await admin.save();

                    res.json({token, admin_id: admin.id});
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
});
