import * as uuid from 'uuid';
import {
    SET_ALERT,
    REMOVE_ALERT,
    SET_ALERT_POSITION
} from './types';

const initialPosition = '110%';
const slideTimeout = 100;

export const setAlert = (msg, type, timeout = 5000) => dispatch => {
    const id = uuid.v4();

    dispatch({
        type: SET_ALERT,
        payload: { msg, type, id, position: initialPosition }
    });

    /** Working with position to provide slide effect */
    setTimeout(
        () =>
            dispatch({
                type: SET_ALERT_POSITION,
                payload: { id, position: 0 }
            }),
        slideTimeout
    );

    setTimeout(
        () =>
            dispatch({
                type: SET_ALERT_POSITION,
                payload: { id, position: initialPosition }
            }),
        timeout - 3 * slideTimeout // 200ms slide transition
    );

    setTimeout(
        () =>
            dispatch({
                type: REMOVE_ALERT,
                payload: { msg, type, id }
            }),
        timeout
    );
};

export const removeAlert = (id) => dispatch => {
    dispatch({
        type: SET_ALERT_POSITION,
        payload: { id, position: initialPosition }
    });

    setTimeout(
        () =>
            dispatch({
                type: REMOVE_ALERT,
                payload: { id }
            }),
        3 * slideTimeout
    );
};

/**
 *
 * @param msg string - Error message
 * @param timeout number - In seconds
 * @return {function(*): void}
 */
export const setErrorAlert = (msg, timeout = 5) => dispatch => {
    dispatch(setAlert(msg, 'error', timeout * 1000));
};

export const setInfoAlert = (msg, timeout = 5) => dispatch => {
    dispatch(setAlert(msg, 'info', timeout * 1000));
};

export const setSuccessAlert = (msg, timeout = 5) => dispatch => {
    dispatch(setAlert(msg, 'success', timeout * 1000));
};

export const setWarningAlert = (msg, timeout = 5) => dispatch => {
    dispatch(setAlert(msg, 'warning', timeout * 1000));
};
