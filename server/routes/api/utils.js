var keystone = require('keystone');

exports.geo = function(req, res) {
  req.session.geo = {
    lat: req.query.geolat,
    lng: req.query.geolng,
    name: req.query.geoname,
    distance: req.query.geodist
  }
  return res.json(req.session.geo)
}

