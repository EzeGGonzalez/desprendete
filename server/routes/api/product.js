var keystone = require('keystone');
var Product = keystone.list('Product');

const _ = require('lodash');

/**
 * List Products
 */
exports.list = function(req, res) {
  const filters = []

  let q = _.get(req, 'query.q')
  let categoryId = _.get(req, 'query.category')

  if (q && q.length) {
    let words = []
    q.split(" ").forEach(t => words.push(new RegExp(`.*${t}.*`, 'i')) )

    filters.push({
        $or: [
        { "name": { $in: words }},
        { "description": { $in: words }},
      ]
    })
  }

  if (req.query.geolat && req.query.geolng) {
    let distance = req.query.geodist || 5

    filters.push({
      address: {
        $near: {
          $geometry: {
            type: "Point" ,
            coordinates: [ req.query.geolng , req.query.geolat ]
          },
          // distance is KM
          $maxDistance: distance * 1000
        }
      }
    })
  }

  if (categoryId) {
    filters.push({
      $or: [
        { 'category': categoryId },
        { 'subcategory': categoryId }
      ]
    })
  }

  Product.model
    .find(filters.length > 0 ? {$and: filters} : {})
    .populate('owner')
    .exec(function(err, items) {
      if (err) return res.json({ err: err });
      res.json(items);
  });
}

exports.get = function (req, res) {
  Product.model
    .findOne({slug: req.params.id})
    .populate('owner category subcategory')
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
