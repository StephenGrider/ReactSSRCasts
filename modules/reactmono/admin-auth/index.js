require = require('esm')(module, {await: true});
module.exports.getRoutes = require('./src/getRoutes').default;
module.exports.models = {
    admins: require('./src/model/Admin').default
};
