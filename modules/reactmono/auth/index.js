require = require('esm')(module, {await: true});
module.exports.initSession = require('./initSession').default;
module.exports.requireLogin = require('./middleware/requireLogin').default;
module.exports.getRoutes = require('./getRoutes').default;
module.exports.models = {
    'users': require('./model/User').default
}
