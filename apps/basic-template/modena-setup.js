const { configureEndpoints } = require('modena');

module.exports = configureEndpoints(router => {
	router.get('/', (req, res, next) => res.render('index'));
});
