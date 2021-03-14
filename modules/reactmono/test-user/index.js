require = require('esm')(module, {await: true});
module.exports.route = require('./src/route').default;
module.exports.dataProvider = require('./src/service/dataProvider').default;
