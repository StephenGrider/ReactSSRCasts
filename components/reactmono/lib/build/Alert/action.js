"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setWarningAlert = exports.setSuccessAlert = exports.setInfoAlert = exports.setErrorAlert = exports.removeAlert = exports.setAlert = void 0;

var uuid = _interopRequireWildcard(require("uuid"));

var _types = require("./types");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var initialPosition = '110%';
var slideTimeout = 100;

var setAlert = function setAlert(msg, type) {
  var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5000;
  return function (dispatch) {
    var id = uuid.v4();
    dispatch({
      type: _types.SET_ALERT,
      payload: {
        msg: msg,
        type: type,
        id: id,
        position: initialPosition
      }
    });
    /** Working with position to provide slide effect */

    setTimeout(function () {
      return dispatch({
        type: _types.SET_ALERT_POSITION,
        payload: {
          id: id,
          position: 0
        }
      });
    }, slideTimeout);
    setTimeout(function () {
      return dispatch({
        type: _types.SET_ALERT_POSITION,
        payload: {
          id: id,
          position: initialPosition
        }
      });
    }, timeout - 3 * slideTimeout // 200ms slide transition
    );
    setTimeout(function () {
      return dispatch({
        type: _types.REMOVE_ALERT,
        payload: {
          msg: msg,
          type: type,
          id: id
        }
      });
    }, timeout);
  };
};

exports.setAlert = setAlert;

var removeAlert = function removeAlert(id) {
  return function (dispatch) {
    dispatch({
      type: _types.SET_ALERT_POSITION,
      payload: {
        id: id,
        position: initialPosition
      }
    });
    setTimeout(function () {
      return dispatch({
        type: _types.REMOVE_ALERT,
        payload: {
          id: id
        }
      });
    }, 3 * slideTimeout);
  };
};
/**
 *
 * @param msg string - Error message
 * @param timeout number - In seconds
 * @return {function(*): void}
 */


exports.removeAlert = removeAlert;

var setErrorAlert = function setErrorAlert(msg) {
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  return function (dispatch) {
    dispatch(setAlert(msg, 'error', timeout * 1000));
  };
};

exports.setErrorAlert = setErrorAlert;

var setInfoAlert = function setInfoAlert(msg) {
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  return function (dispatch) {
    dispatch(setAlert(msg, 'info', timeout * 1000));
  };
};

exports.setInfoAlert = setInfoAlert;

var setSuccessAlert = function setSuccessAlert(msg) {
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  return function (dispatch) {
    dispatch(setAlert(msg, 'success', timeout * 1000));
  };
};

exports.setSuccessAlert = setSuccessAlert;

var setWarningAlert = function setWarningAlert(msg) {
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  return function (dispatch) {
    dispatch(setAlert(msg, 'warning', timeout * 1000));
  };
};

exports.setWarningAlert = setWarningAlert;