const Sequelize = require('sequelize');
const { express } = require('modena');
const router = express.Router();
const modelsDefinition = require('./models');
const usersControllerFactory = require('./controllers/users-controller');

const registerRoutes = (usersController, middleware) => {
	router.get('/api/user', usersController.getAll);
	router.get('/api/user/getById', usersController.getById);
	router.post('/api/user', [middleware.bodyParser, usersController.create]);
	router.put('/api/user', [middleware.bodyParser, usersController.update]);
	router.delete('/api/user', usersController.deleteUser);

	return router;
};

const configureRouter = (middleware, utils, appConfig) => {

	/*
		appConfig will contain the properties starting with 'modena-database-api-template_' from the global configuration
		without that prefix
	*/

	const dbConnection = new Sequelize(appConfig.db_name, appConfig.db_user, appConfig.db_password, {
		host: appConfig.db_host,
		dialect: 'mysql'
	});

	const models = modelsDefinition(dbConnection, Sequelize);

	return dbConnection.sync()
	.then(() => {
		const usersService = require('./services/users-service')(models);
		const usersController = usersControllerFactory(usersService);

		return registerRoutes(usersController, middleware);
	});
}

module.exports = { configureRouter };
