const express = require('express');
const router = express.Router();
const server = express();
const bodyParser = require('body-parser');
const jsonMiddleware = bodyParser.json();
const Sequelize = require('sequelize');
const modelsDefinition = require('./models');
const usersControllerFactory = require('./controllers/users-controller');
const config = require('./config/config.json');

const dbConnection = new Sequelize(config.db_name, config.db_user, config.db_password, {
	host: config.db_host,
	dialect: 'mysql'
});

const models = modelsDefinition(dbConnection, Sequelize);

dbConnection.sync()
.then(() => {
	const usersService = require('./services/users-service')(models);
	const usersController = usersControllerFactory(usersService);

	router.get('/api/users', usersController.getAll);
	router.get('/api/users/getById', usersController.getById);
	router.post('/api/users', jsonMiddleware, usersController.create);
	router.put('/api/users', jsonMiddleware, usersController.update);
	router.delete('/api/users', usersController.deleteUser);

	server.use('/', router);

	server.listen(80, error => {
		if (error) {
			console.error(error);
		}
		else {
			console.log('Express server listening on port 80');
		}
	});
});
