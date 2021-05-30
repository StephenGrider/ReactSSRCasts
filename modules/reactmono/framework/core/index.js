require = require('esm')(module, {await: true});
module.exports.routeProcessor = require('./src/routeProcessor').default;
module.exports.modelProcessor = require('./src/modelProcessor').default;
module.exports.dbConnector = require('./src/dbConnector').default;
module.exports.initAppConfigs = require('./src/initAppConfigs').default;
