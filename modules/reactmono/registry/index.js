require = require('esm')(module, {await: true});
let AppConfig = require('./AppConfig').default;

module.exports.AppConfig = new AppConfig();
