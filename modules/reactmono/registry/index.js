require = require('esm')(module, {await: true});
let AppConfig = require('./src/AppConfig').default;
let Model = require('./src/Model').default;
let DataProvider = require('./src/DataProvider').default;
let RouteDataResolver = require('./src/RouteDataResolver').default;

module.exports.AppConfig = new AppConfig();
module.exports.Model = new Model();
module.exports.DataProvider = new DataProvider();
module.exports.RouteDataResolver = new RouteDataResolver();
