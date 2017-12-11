require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("keystone");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
__webpack_require__(0).config();

// Require keystone
var keystone = __webpack_require__(1);

// Require Passport
var passport = __webpack_require__(5);

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'desprendete',
	'brand': 'desprendete',

	'sass': process.cwd() + '/server/public',
	'static': process.cwd() + '/server/public',
	'favicon': process.cwd() + '/static/favicon.ico',
	'views': process.cwd() + '/server/templates/views',
	'updates': process.cwd() + '/server/updates',
	'view engine': 'pug',

	'emails': process.cwd() + '/server/templates/emails',

	'auto update': true,
	'session': true,
	'session store': 'mongo',

	'auth': true,
	'user model': 'User'
});

// Load your project's Models
keystone.import('../server/models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: __webpack_require__(2),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

keystone.pre("routes", passport.initialize());
keystone.pre("routes", passport.session());

// Load your project's Routes
keystone.set('routes', __webpack_require__(6));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	galleries: 'galleries',
	users: 'users'
});

// Start Keystone to connect to your database and initialise the web server


if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
	console.log('----------------------------------------' + '\nWARNING: MISSING MAILGUN CREDENTIALS' + '\n----------------------------------------' + '\nYou have opted into email sending but have not provided' + '\nmailgun credentials. Attempts to send will fail.' + '\n\nCreate a mailgun account and add the credentials to the .env file to' + '\nset up your mailgun integration');
}

keystone.start();

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(7),
    Nuxt = _require.Nuxt,
    Builder = _require.Builder;
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

var path = __webpack_require__(3);

var keystone = __webpack_require__(1);
var middleware = __webpack_require__(8);

var importRoutes = keystone.importer(path.join(process.cwd(), 'server/routes'));

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Import and Set Nuxt.js options
	var config = __webpack_require__(9);
	config.dev = !("development" === 'production');

	// Init Nuxt.js
	var nuxt = new Nuxt(config);

	// Build only in dev mode
	if (config.dev) {
		var builder = new Builder(nuxt);
		builder.build();
	}

	app.use(function (req, res, next) {
		// allow cross origin requests
		res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET');
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	});

	app.options('/api*', function (req, res) {
		res.send(200);
	});

	app.get('/logout', routes.api.login.logout);
	app.get('/auth/facebook', routes.api.login.authFacebook);
	app.get('/auth/facebook/callback', routes.api.login.authFacebookCallback);

	// Views
	// app.get('/back', routes.views.index);
	app.get('/gallery', routes.views.gallery);

	// API
	app.get('/api/categories', routes.api.category.list);

	app.put('/api/user/:id', routes.api.user.update);

	app.post('/api/products', routes.api.product.create);
	app.get('/api/products', routes.api.product.list);
	app.get('/api/products/:id', routes.api.product.get);

	app.post('/api/transactions', routes.api.transaction.create);

	app.get('/api/user/:id/transactions', routes.api.user.listTransactions);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);


	// Give nuxt middleware to express
	app.use(nuxt.render);
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = __webpack_require__(2);

/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [{ label: 'Home', key: 'home', href: '/' }, { label: 'Gallery', key: 'gallery', href: '/gallery' }];
	res.locals.user = req.user;
	next();
};

/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	res.locals.messages = _.some(flashMessages, function (msgs) {
		return msgs.length;
	}) ? flashMessages : false;
	next();
};

/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var path = __webpack_require__(3);
__webpack_require__(0).config();

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'desprendete',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'desprendete' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  css: [{ src: '~assets//open-iconic/font/css/open-iconic.css' }, { src: '~assets//open-iconic/font/css/open-iconic-bootstrap.css' }, { src: '~assets/scss/main.scss', lang: 'scss' }],

  modules: [['bootstrap-vue/nuxt', { css: false }], '@nuxtjs/dotenv', '@nuxtjs/axios', ['nuxt-sass-resources-loader', path.resolve(__dirname, 'assets/scss/resources.scss')]],

  axios: {
    baseURL: process.env.API_URL
  },

  plugins: [
  // { src: '~plugins/axios.js', ssr: false },
  { src: '~plugins/vue-masonry.js', ssr: false }, { src: '~plugins/maps.js', ssr: false }, '~plugins/filters/fullname.js', '~plugins/filters/cloudinary-thumb.js'],

  env: {
    baseUrl: process.env.BASE_URL,
    apiUrl: process.env.API_URL,
    GMAPS_KEY: process.env.GMAPS_KEY
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend: function extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ })
/******/ ]);
//# sourceMappingURL=main.map