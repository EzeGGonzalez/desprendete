const { Nuxt, Builder } = require('nuxt');

/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var path = require('path');

var keystone = require('keystone');
var middleware = require('./middleware');

var importRoutes = keystone.importer(path.join(process.cwd(), 'server/routes'));

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Import and Set Nuxt.js options
	let config = require('../../nuxt.config.js')
	config.dev = !(process.env.NODE_ENV === 'production')

	// Init Nuxt.js
	const nuxt = new Nuxt(config)

	// Build only in dev mode
	if (config.dev) {
		const builder = new Builder(nuxt)
		builder.build()
	}

	app.use(function (req, res, next) { // allow cross origin requests
		res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET');
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	});

	app.options('/api*', function (req, res) {
		res.send(200);
	});

	// Views
	app.get('/back', routes.views.index);
	app.get('/gallery', routes.views.gallery);

	// API
	app.get('/api/products', routes.api.product.list);
	app.get('/api/products/:id', routes.api.product.get);
	app.post('/api/products', routes.api.product.create);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);


	// Give nuxt middleware to express
	app.use(nuxt.render)
};
