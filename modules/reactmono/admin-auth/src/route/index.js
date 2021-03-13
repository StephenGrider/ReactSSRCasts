import signin from './signin';
import signup from './signup';
import me from './me';

/**
 * Admin Authentication Routes.
 */
export default () => ([
    signin(),
    signup(),
    me()
]);
