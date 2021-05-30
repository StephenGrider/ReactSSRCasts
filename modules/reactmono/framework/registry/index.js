require = require('esm')(module, {await: true});
let AppConfig = require('./src/AppConfig').default;
let Model = require('./src/Model').default;

module.exports.AppConfig = new AppConfig();
module.exports.Model = new Model();
