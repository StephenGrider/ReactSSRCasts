require = require('esm')(module, {await: true});
module.exports.route = require('./src/route').default;
module.exports.model = require('./src/model').default;
module.exports.middleware = require('./src/middleware').default;
module.exports.dataProvider = require('./src/service/dataProvider').default;
