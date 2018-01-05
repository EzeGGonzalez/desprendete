var keystone = require('keystone');

var Transaction = keystone.list('Transaction');
var Product = keystone.list('Product');
var User = keystone.list('User');

var Email = require('keystone-email');

const sendEmail = (product, interested) => {
  const locals = {
    product: product.name,
    owner: {
      ...product.owner,
      fb: `https://www.facebook.com/${product.owner.facebookId}`
    },
    interested: {
      ...interested,
      fb: `https://www.facebook.com/${interested.facebookId}`
    }
  }

  const from = {
    name: 'Desprendete',
    email: 'hola@desprendete.com',
  }

  const config = {
    engine: 'pug',
    transport: 'mailgun',
    root: process.cwd() + '/server/templates/emails'
  }

  new Email('want-it-interested.pug', config).send(locals, {
    to: interested.email,
    from,
    subject: `Mostraste interés en ${product.name}`
  });

  new Email('want-it-owner.pug', config).send(locals, {
    to: product.owner.email,
    from,
    subject: `Hay un interesado en tu ${product.name}`
  });
}

exports.create = function(req, res) {
  var item = new Transaction.model(),
    data = (req.method == 'POST') ? req.body : req.query;
      
  item.getUpdateHandler(req).process(data, err => {
    if (err) return res.json({ error: err });
    res.json(item);

    Product.model
      .findById(item.product)
      .populate('owner')
      .setOptions({ lean: true })
      .exec(function(err, product) {
        User.model
          .findById(item.owner)
          .setOptions({ lean: true })
          .exec(function(err, user) {
            sendEmail(product, user)
          })
      });
  });
}