var keystone = require('keystone');

var Transaction = keystone.list('Transaction');
var User = keystone.list('User');

const UserModel = User.model;

exports.listTransactions = function(req, res) {
  if (!req.user) {
    res.json([]);
    return;
  }
  
  Transaction.model
    .find({owner: req.user._id})
    .exec(function(err, items) {
      if (err) return res.json({ err: err });
      res.json(items);
  });
}

exports.update = function(req, res) {
  User.model.findById(req.params.id).exec(function(err, item) {

    if (err) return res.json({ err: err });
    if (!item) return res.json({ err: 'not found' });

    var data = (req.method == 'PUT') ? req.body : req.query;

    item.getUpdateHandler(req).process(data, function(err, user) {

      if (err) return res.json({ err: err });

      UserModel
        .findById(req.params.id)
        .setOptions({ lean: true })
        .exec(function(err, user) {
          res.json(user);
        });
    });
  });
}
