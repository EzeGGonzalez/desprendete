var keystone = require('keystone');
var Product = keystone.list('Product');
var moment = require('moment');
var fs = require('fs');
var sm = require('sitemap');

exports.geo = function(req, res) {
  req.session.geo = {
    lat: req.query.geolat,
    lng: req.query.geolng,
    name: req.query.geoname,
    distance: req.query.geodist
  }
  return res.json(req.session.geo)
}

var generateSitemap = (req, res, next) => {
  var hostname = process.env.BASE_URL;

  Product.model
    .find()
    .exec()
    .then(items => {
      var sitemap = sm.createSitemap({
        hostname,
        cacheTime: 600000,
        urls: items.map(p => ({ url: `/produc/${p.slug}` }))
      });

      fs.writeFileSync(`${process.cwd()}/sitemap.xml`, sitemap.toString());

      res.header('Content-Type', 'application/xml');
      res.send(sitemap.toString());
    }, next)
}

exports.generateSitemap = generateSitemap

exports.sitemap = (req, res, next) => {
  try {
    let sitemap = fs.readFileSync(`${process.cwd()}/sitemap.xml`);

    if (sitemap) {
      res.header('Content-Type', 'application/xml');
      res.send(sitemap);
    } else {
      generateSitemap(req, res, next);
    }
  } catch (e) {
    generateSitemap(req, res, next);
  }
}
