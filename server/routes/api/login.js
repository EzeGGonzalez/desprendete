var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy;

var keystone = require('keystone'),
	User = keystone.list('User');

const UserModel = User.model;

const fbCb = (accessToken, refreshToken, profile, done) => {
	UserModel
		.findOne({$or: [{facebookId: profile.id}, {email: profile.emails[0].value}]})
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
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	UserModel
		.findById(id)
		.setOptions({ lean: true })
		.exec(function(err, user) {
			done(err, user);
		});
});

passport.use(strategy);

exports.logout = (req, res) => {
	req.session.destroy((err) => {
		if(err) return next(err)
	
		req.logout()
	
		res.redirect('/')
	})
	// req.logout();
	// res.redirect('/');
};

exports.authFacebook = passport.authenticate('facebook');
exports.authFacebookCallback = passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' });