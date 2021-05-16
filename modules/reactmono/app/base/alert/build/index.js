"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Alert = _interopRequireDefault(require("./Alert"));

var _ducks = _interopRequireDefault(require("./ducks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  component: _Alert["default"],
  ducks: _ducks["default"]
};
exports["default"] = _default;