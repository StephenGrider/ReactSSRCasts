/**
 * Get current logged in user from request.
 */
export default (req) => {
    console.log('req.user', req.user);
    return req.user;
};
