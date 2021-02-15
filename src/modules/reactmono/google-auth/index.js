require = require('esm')(module, {await: true});
module.exports.routes = require('./routes').default;
