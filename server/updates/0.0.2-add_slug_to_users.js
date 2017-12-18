var keystone = require('keystone');
var async = require('async');
var User = keystone.list('User');
var utils = require('keystone-utils');

exports = module.exports = function (done) {
  User.model
    .find({})
    .exec(function(err, items) {
      if (err) return res.json({ err: err });

      async.forEach(items, (u, d) => {
        u.slug = utils.slug(`${u.name.first} ${u.name.last} ${u._id}`);
        u.save(d)
      }, done)
    });
};