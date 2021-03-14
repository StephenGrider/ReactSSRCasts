import { innerUsers } from './mock-data/server-test-response';

/**
 * Users list sample data.
 */
export default async () => {
    return [...innerUsers];
};
