require = require('esm')(module, {await: true});
let AppConfig = require('./AppConfig').default;
let Model = require('./Model').default;

module.exports.AppConfig = new AppConfig();
module.exports.Model = new Model();
