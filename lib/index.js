'use strict';
exports.register = function (plugin, options, next) {
  if (process.env.NODE_ENV === 'production') {
    plugin.require('hapi-mongodb', options, function (err) {
      if (err) {
        plugin.log(['error', 'plugin', 'database', 'mongodb'], err);
        return next(err);
      }
      plugin.expose('db', plugin.plugins['hapi-mongodb'].db);
      next();
    });
  } else {
    plugin.require('hapi-nedb', options, function (err) {
      if (err) {
        plugin.log(['error', 'plugin', 'database', 'nedb'], err);
        return next(err);
      }
      plugin.expose('db', plugin.plugins['hapi-nedb'].db);
      next();
    });
  }
};
