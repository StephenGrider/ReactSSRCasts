"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SignUpPage = function SignUpPage(_ref) {
  var auth = _ref.auth;
  return auth.admin && /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Redirect, {
    to: '/'
  }) || /*#__PURE__*/_react["default"].createElement("div", {
    className: 'center-align',
    style: {
      marginTop: '200px'
    }
  }, /*#__PURE__*/_react["default"].createElement("h3", null, "Welcome"), /*#__PURE__*/_react["default"].createElement("p", null, "Sign Up Form"));
};

var mapStateToProps = function mapStateToProps(_ref2) {
  var auth = _ref2.auth;
  return {
    auth: auth
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, null)(SignUpPage);

exports["default"] = _default;