const express = require('express');
const server = express();
const router = express.Router();
const { join } = require('path');
const assets = require('express-asset-versions');
const authenticationService = require('./services/authentication-service');
const configureYingRoutes = require('./controllers/ying');
const configureYangRoutes = require('./controllers/yang');
const {	logInMiddleware, logOutMiddleware, passportMiddleware } = require('./passport/setup');

server.set('view engine', 'ejs');
server.set('views', join(__dirname, 'views'));

const assetsPath = join(__dirname, 'public');
server.use('/', express.static(assetsPath));
server.use(assets('/', assetsPath));

router.get('/', (req, res, next) => res.render('index'));

router.post('/log-in', passportMiddleware, logInMiddleware, (req, res, next) => 
	res.json(authenticationService.getClientSideInfo(req.user, req.body.permissions)));

router.post('/log-out', passportMiddleware, logOutMiddleware, (req, res, next) =>
	res.send('Successfully logged out'));

router.get('/client-side', passportMiddleware, (req, res, next) => {
	res.set('Content-Type', 'application/javascript');
	return res.json({
		user: authenticationService.getClientSideInfo(req.user, req.query.permissions)
	});
});

configureYingRoutes(router, passportMiddleware);
configureYangRoutes(router, passportMiddleware);

server.use('/authentication-template', router);

server.listen(80, error => {
	if (error) {
		console.error(error);
	}
	else {
		console.log('Express server listening on port 80');
	}
});
