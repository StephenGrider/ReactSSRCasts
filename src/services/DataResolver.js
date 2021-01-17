import {users, admins, innerUsers} from '../dev/server-test-response';

class DataResolver {
    request = {};

    constructor(req) {
        this.request = req;
    };

    get = (dataKey) => {
        dataKey = dataKey.replace(/^\//, '');
        // ToDo
        switch (dataKey) {
            // Users extraction
            case 'users':
                return {data: users};

            case 'inner-users':
                return {data: innerUsers};

            // Admins extraction
            case 'admins':
                return {data: admins};

            // Get current user
            case 'current_user':
                return {data: this.request.user};

            default:
                return {};
        }
    };
}

export default DataResolver;
