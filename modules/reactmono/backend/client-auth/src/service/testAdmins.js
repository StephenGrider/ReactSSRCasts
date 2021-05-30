import { admins } from './mock-data/server-test-response';

/**
 * Admin Users list sample data.
 */
export default async () => {
    return [...admins];
};
