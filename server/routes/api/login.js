var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy;

var keystone = require('keystone'),
	User = keystone.list('User');

const UserModel = User.model;

const fbCb = (accessToken, refreshToken, profile, done) => {
	UserModel
		.findOne({facebookId: profile.id})
		.exec(function(err, user) {
			if(err) throw(err);
			if(!err && user != null) return done(null, user);

			let newUser = {
				'name.first': profile.name.givenName,
				'name.last': profile.name.familyName,
				'email': profile.emails[0].value,
				'password': Math.random().toString(36).slice(-8),
				'isAdmin': false,
				'facebookId': profile.id
			}

			var user = new UserModel(newUser);

			user.save(function(err) {
				if(err) throw err;
				done(null, user);
			});
		});
}

const strategy = new FacebookStrategy({
	clientID: process.env.FACEBOOK_APP_ID,
	clientSecret: process.env.FACEBOOK_APP_SECRET,
	callbackURL: `${process.env.BASE_URL}/auth/facebook/callback`,
	profileFields: ["id", "birthday", "email", "first_name", "gender", "last_name"],
	scope: ['public_profile', 'email']
}, fbCb);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(strategy);

exports.authFacebook = passport.authenticate('facebook');
exports.authFacebookCallback = passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' });