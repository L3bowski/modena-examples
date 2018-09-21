const Sequelize = require('sequelize');
const { configureEndpoints } = require('modena');
const modelsDefinition = require('./models');
const usersControllerFactory = require('./controllers/users-controller');

module.exports = configureEndpoints((router, config, middleware) => {
	/*
		config will contain the properties starting with 'database-api-template_' from the global configuration
		without that prefix
	*/

	const dbConnection = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
		host: config.DB_HOST,
		dialect: 'mysql'
	});

	const models = modelsDefinition(dbConnection, Sequelize);

	return dbConnection.sync()
	.then(() => {
		const usersService = require('./services/users-service')(models);
		const usersController = usersControllerFactory(usersService);

		router.get('/api/users', usersController.getAll);
		router.get('/api/users/getById', usersController.getById);
		router.post('/api/users', middleware.bodyParser, usersController.create);
		router.put('/api/users', middleware.bodyParser, usersController.update);
		router.delete('/api/users', usersController.deleteUser);
	});
});
