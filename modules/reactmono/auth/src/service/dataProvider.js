import currentUser from './currentUser';
import testAdmins from './testAdmins';

export default () => ({
    'auth.current_user': currentUser,
    'auth.admins': testAdmins
});
