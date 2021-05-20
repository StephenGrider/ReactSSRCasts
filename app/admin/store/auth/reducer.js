import {
    FETCH_CURRENT_ADMIN,
    LOGIN_SUCCESS,
    AUTH_ERROR,
    LOGOUT
} from './type';
import { deleteAdminTokenCookies, setAdminTokenCookie } from '~app/utils/cookie';

export default (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_CURRENT_ADMIN:
            let adminData = payload.data ? payload.data : {};
            return {...state, admin: adminData};

        case LOGIN_SUCCESS:
            if (document) {
                deleteAdminTokenCookies();
                setAdminTokenCookie(payload.token);
            }

            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };

        case AUTH_ERROR:
        case LOGOUT:
            deleteAdminTokenCookies();

            return {
                ...state,
                admin: null
            };

        default:
            return state;
    }
}
