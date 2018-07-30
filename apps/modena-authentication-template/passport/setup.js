const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const authenticationService = require('../services/authentication-service');
const localStrategy = require('./local-strategy');

/* Passport user transformations */

const userSerializer = (user, doneCallback) => {
	const serializedUser = user.id;
	return doneCallback(null, serializedUser);
}

const userDeserializer = (serializedUser, doneCallback) => {
	return authenticationService.userDeserializer(serializedUser)
	.then(user => {
		if (!user) {
			var error = {
				message: 'Incorrect username or password'
			};
			return doneCallback(error, null);
		}
		return doneCallback(null, user);
	});
}

passport.serializeUser(userSerializer);
passport.deserializeUser(userDeserializer);

/* Passport strategies */

passport.use('local-strategy', localStrategy);

/* Passport logging middleware */

const logInMiddleware = (req, res, next) => {

	const authenticationCallback = (error, user, info) => {
		if (error) {
			return res.status(401).json(error);
		}

		req.logIn(user, function (error) {
			if (error) {
				return res.send(error);
			}
			return next();
		});
	};
	const authenticationMiddleware = passport.authenticate('local-strategy', authenticationCallback);
	authenticationMiddleware(req, res, next);
};

const logOutMiddleware = (req, res, next) => {
	delete req.session.passport;
	return next();
};

/* Passport context middleware */

const jsonMiddleware = bodyParser.json();
const sessionMiddleware = session({
	secret: 'Secret to be stored in some untracked file',
	resave: false,
	saveUninitialized: true,
});
const passportInitialize = passport.initialize();
const passportSession = passport.session();

const passportMiddleware = [sessionMiddleware, jsonMiddleware, passportInitialize, passportSession];

module.exports = {
	logInMiddleware,
	logOutMiddleware,
	passportMiddleware
};
