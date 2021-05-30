import bcrypt from 'bcryptjs';
import config from 'config';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Model } from '@reactmono/framework-registry';

/**
 * @route POST backend/api/signup
 * @desc Admin Registration Route
 */
export default () => ({
    'path': `/signup`,
    'area': 'admin',
    'method': 'POST',
    'middleware': [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({min: 6}),
        check(
            'password_confirm',
            'Please enter a confirmation password with 6 or more characters'
        ).isLength({min: 6})
    ],
    'callback': async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {name, email, password, password_confirm} = req.body;
        if (password !== password_confirm) {
            return res.status(400).json({errors: [{msg: 'Passwords should match'}]});
        }

        let Admin = Model.get('admins');
        try {
            let admin = await Admin.findOne({email});

            if (admin) {
                return res.status(400).json({
                    errors: [{msg: 'Admin User already exists'}]
                });
            }

            admin = new Admin({
                name,
                email,
                password
            });

            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(password, salt);

            await admin.save();

            // Return jsonwebtoken
            const payload = {
                admin: {
                    id: admin.id
                }
            };

            let adminSessionTime = parseInt(config.get('adminSessionTime'));
            let jwtSecret = config.get('jwtSecret');
            jwt.sign(
                payload,
                jwtSecret,
                {expiresIn: adminSessionTime},
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.json({token});
                }
            );

            res.send('Admin User is registered');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
});
