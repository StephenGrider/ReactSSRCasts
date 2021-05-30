import config from 'config';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export default () => {
    let configSecret = config.get('jwtSecret');

    let date = new Date();
    let msec = date.getMilliseconds();

    let uuid = uuidv4();

    return crypto.createHash('md5')
        .update(`${configSecret}${msec}${uuid}`)
        .digest('hex');
};
