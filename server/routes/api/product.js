var keystone = require('keystone');

var Product = keystone.list('Product');

/**
 * List Products
 */
exports.list = function(req, res) {
  Product.model
    .find()
    .populate('owner')
    .exec(function(err, items) {
      if (err) return res.json({ err: err });
      res.json(items);
  });
}

exports.get = function (req, res) {
  Product.model
    .findOne({slug: req.params.id})
    .populate('owner category')
    .exec(function(err, item) {
      if (err) return res.json({ err: err });
      if (!item) return res.json('not found');

      res.json(item);
  });
}

exports.create = function(req, res) {
  var item = new Product.model(),
    data = (req.method == 'POST') ? req.body : req.query;

  item.getUpdateHandler(req).process(data, err => {
    if (err) return res.json({ error: err });
    res.json(item);
  });
}

exports.update = function(req, res) {
  Product.model
    .findOne({slug: req.params.id})
    .exec(function(err, item) {
      if (err) return res.json({ err: err });
      if (!item) return res.json({ err: 'not found' });

      var data = (req.method == 'PUT') ? req.body : req.query;

      item.getUpdateHandler(req).process(data, function(err, product) {

        if (err) return res.json({ err: err });

        Product.model
          .findOne({slug: req.params.id})
          .setOptions({ lean: true })
          .exec(function(err, product) {
            res.json(product);
          });
      });
    });
}
