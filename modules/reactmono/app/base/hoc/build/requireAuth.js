"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(ChildComponent) {
  var RequireAuth = function RequireAuth(props) {
    return props.auth === false && /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Redirect, {
      to: '/'
    }) || props.auth === null && /*#__PURE__*/_react["default"].createElement("div", null, "Loading...") || /*#__PURE__*/_react["default"].createElement(ChildComponent, props);
  };

  var mapStateToProps = function mapStateToProps(_ref) {
    var auth = _ref.auth;
    return {
      auth: auth
    };
  };

  return (0, _reactRedux.connect)(mapStateToProps)(RequireAuth);
};

exports["default"] = _default;