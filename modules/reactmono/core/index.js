require = require('esm')(module, {await: true});
module.exports.DataResolver = require('./DataResolver').default;
module.exports.routeProcessor = require('./routeProcessor').default;
module.exports.dbConnector = require('./dbConnector').default;
