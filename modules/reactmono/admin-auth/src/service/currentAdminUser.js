import { Model } from '@reactmono/registry';

/**
 * Get current logged in admin from request.
 */
export default async (req) => {
    let Admin = Model.get('admins');
    let admin = await Admin.findById(req.admin.id).select('-password');

    return admin ? admin : null;
};
