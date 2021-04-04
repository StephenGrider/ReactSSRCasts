require = require('esm')(module, {await: true});
module.exports.initSession = require('./src/initSession').default;
module.exports.requireLogin = require('./src/middleware/requireLogin').default;
module.exports.route = require('./src/route').default;
module.exports.model = {
    'users': require('./src/model/User').default
};
module.exports.getAdmins = require('./src/service/testAdmins').default;
