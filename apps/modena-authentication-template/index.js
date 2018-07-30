const { express } = require('modena');
const router = express.Router();
const authenticationService = require('./services/authentication-service');
const configureYingRoutes = require('./controllers/ying');
const configureYangRoutes = require('./controllers/yang');

const configureRouter = (middleware, { userManagementUtils }) => {

	userManagementUtils.createStrategy({
		userAuthenticator: authenticationService.userAuthenticator,
		userDeserializer: authenticationService.userDeserializer,
	});

	router.get('/', middleware.passport, (req, res, next) => res.render('index'));

	router.post('/log-in', middleware.passport, userManagementUtils.logInMiddleware, (req, res, next) => 
		res.json(authenticationService.getClientSideInfo(req.user, req.body.permissions)));

	router.post('/log-out', middleware.passport, userManagementUtils.logOutMiddleware, (req, res, next) =>
		res.send('Successfully logged out'));

	router.get('/client-side', middleware.passport, (req, res, next) => {
		res.set('Content-Type', 'application/javascript');
		return res.json({
			user: authenticationService.getClientSideInfo(req.user, req.query.permissions)
		});
	});

	configureYingRoutes(router, middleware.passport);
	configureYangRoutes(router, middleware.passport);
	
	return router;
}

module.exports = { configureRouter };
