require = require('esm')(module, {await: true});
module.exports.route = require('./src/route').default;
