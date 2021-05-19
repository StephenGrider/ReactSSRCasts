import {
    SET_ALERT,
    REMOVE_ALERT,
    SET_ALERT_POSITION
} from './type';

const initialState = [];

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT:
            return payload && payload.msg ? [...state, payload] : state;

        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload.id);

        case SET_ALERT_POSITION:
            return state.map(alert => {
                return alert.id === payload.id
                    ? {...alert, position: payload.position}
                    : alert;
            });

        default:
            return state;
    }
}
