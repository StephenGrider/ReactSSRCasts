import signin from './signin';
import signup from './signup';
import signout from './signout';
import me from './me';

/**
 * Admin Authentication Routes.
 */
export default () => ([
    signin(),
    signup(),
    signout(),
    me()
]);
