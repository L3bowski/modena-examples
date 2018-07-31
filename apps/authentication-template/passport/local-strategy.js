const LocalStrategy = require('passport-local').Strategy;
const authenticationService = require('../services/authentication-service');

const localStrategy = new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password'
}, (username, password, doneCallback) => {
	return authenticationService.userAuthenticator(username, password)
	.then(user => {
		if (!user) {
			const error = {
				message: 'Incorrect username or password'
			};
			return doneCallback(error, null);
		}
		
		return doneCallback(null, user);
	});
});

module.exports = localStrategy;
