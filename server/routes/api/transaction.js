var keystone = require('keystone');

var Transaction = keystone.list('Transaction');

exports.create = function(req, res) {
  var item = new Transaction.model(),
    data = (req.method == 'POST') ? req.body : req.query;
      
  item.getUpdateHandler(req).process(data, err => {
    if (err) return res.json({ error: err });
    res.json(item);
  });
}