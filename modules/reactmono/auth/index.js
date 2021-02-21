require = require('esm')(module, {await: true});
module.exports.requireLogin = require('./middleware/requireLogin').default;
