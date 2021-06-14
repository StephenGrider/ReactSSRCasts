"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _SignUpPage = _interopRequireDefault(require("./page/SignUpPage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import loadable from '@loadable/component';

/**
 * Loadable isn't working correctly for server side rendering if we use it in npm package module.
 * Recommended to avoid loadable usage in npm modules.
 * Expected pages to be processed correctly with loadable and SSR declare routes under app directory.
 */
var _default = [{
  // component: /* #__LOADABLE__ */ loadable(() => import(`./page/SignUpPage`)),
  component: _SignUpPage["default"],
  path: "/signup"
}];
exports["default"] = _default;