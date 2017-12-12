var keystone = require('keystone');
var _ = require('lodash');
var Category = keystone.list('Category');

exports.list = function(req, res) {
  Category.model
    .find({})
    .setOptions({ lean: true })
    .exec(async function(err, items) {
      if (err) return res.json({ err: err });

      let tree = items.filter(c => _.isNil(c.parent)).map(p => {
        return {
          ...p,
          subcategories: items.filter(c => p._id.equals(c.parent))
        }
      })

      res.json(tree);
  });
}

