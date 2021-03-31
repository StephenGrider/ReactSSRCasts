import jwt from 'jsonwebtoken';
import config from 'config';

export default (req, res, next) => {
    // Get token from cookies
    const token = req.cookies['x-auth-token'];

    // Check if not token
    if (!token) {
        return res.status(401).json({data: {errors: ['No token, authorization denied']}});
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.admin = decoded.admin;
        next();
    } catch (err) {
        res.status(401).json({data: {errors: ['Token is not valid']}});
    }
};
