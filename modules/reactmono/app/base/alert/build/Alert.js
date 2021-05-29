"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _store = require("./store");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var removeAlert = _store.action.removeAlert;

var Alert = function Alert(_ref) {
  var alerts = _ref.alerts,
      removeAlert = _ref.removeAlert;

  var getIconType = function getIconType(type) {
    switch (type) {
      case 'success':
        return 'done';

      case 'warning':
        return 'info';

      default:
        return type;
    }
  };

  return alerts && alerts.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: 'alerts-area'
  }, alerts.map(function (alert) {
    return alert.id && /*#__PURE__*/_react["default"].createElement("div", {
      key: "".concat(alert.id),
      id: "alert-".concat(alert.id),
      className: "alert alert-".concat(alert.type),
      style: {
        left: alert.position
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: 'alert-column icon-wrapper'
    }, /*#__PURE__*/_react["default"].createElement("i", {
      className: "material-icons icon-".concat(alert.type)
    }, getIconType(alert.type))), /*#__PURE__*/_react["default"].createElement("div", {
      className: 'alert-column alert-message'
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: 'alert-row alert-title'
    }, /*#__PURE__*/_react["default"].createElement("span", null, alert.type)), /*#__PURE__*/_react["default"].createElement("div", {
      className: 'alert-row alert-text'
    }, /*#__PURE__*/_react["default"].createElement("span", null, alert.msg))), /*#__PURE__*/_react["default"].createElement("div", {
      className: 'alert-column alert-close',
      onClick: function onClick(e) {
        return removeAlert(alert.id);
      }
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "button-close"
    }, /*#__PURE__*/_react["default"].createElement("wbr", null))));
  }));
};

Alert.propTypes = {
  alerts: _propTypes["default"].array.isRequired,
  removeAlert: _propTypes["default"].func.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    alerts: state.alert
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  removeAlert: removeAlert
})(Alert);

exports["default"] = _default;