// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

// Require Passport
var passport = require('passport');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

var instance = process.env.NODE_APP_INSTANCE || 0;

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
	'user model': 'User',

	'port': parseInt(process.env.PORT || 3000) + parseInt(instance),

	// 'admin path': 'admin',

	'trust proxy' : true
});

// Load your project's Models
keystone.import('../server/models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

keystone.pre("routes", passport.initialize());
keystone.pre("routes", passport.session());

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	galleries: 'galleries',
	users: 'users',
});

// Start Keystone to connect to your database and initialise the web server


if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
	console.log('----------------------------------------'
	+ '\nWARNING: MISSING MAILGUN CREDENTIALS'
	+ '\n----------------------------------------'
	+ '\nYou have opted into email sending but have not provided'
	+ '\nmailgun credentials. Attempts to send will fail.'
	+ '\n\nCreate a mailgun account and add the credentials to the .env file to'
	+ '\nset up your mailgun integration');
}


keystone.start();
