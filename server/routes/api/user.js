var keystone = require('keystone');

var Transaction = keystone.list('Transaction');

/**
 * List Transaction
 */
exports.listTransactions = function(req, res) {
  console.log(req.user)
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
