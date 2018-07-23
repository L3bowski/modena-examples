const { securizeEndpoint } = require('../../security');
const apiController = require('./ying-api-controller');
const viewsController = require('./ying-views-controller');

module.exports = (router, middleware) => {
	router.get('/ying', middleware.passport, viewsController.list);
	router.get('/ying/details', middleware.passport, viewsController.details);
	router.get('/ying/edit', middleware.passport, viewsController.edit);
	router.get('/ying/create', middleware.passport, viewsController.create);
	
	router.get('/api/ying', middleware.passport, securizeEndpoint('ying:view'), apiController.getAll);
	router.post('/api/ying', middleware.passport, securizeEndpoint('ying:create'), apiController.create);
	router.put('/api/ying', middleware.passport, securizeEndpoint('ying:edit'), apiController.update);
	router.delete('/api/ying', middleware.passport, securizeEndpoint('ying:delete'), apiController.delete);
	router.get('/api/ying/getById', middleware.passport, securizeEndpoint('ying:view'), apiController.getById);
};
