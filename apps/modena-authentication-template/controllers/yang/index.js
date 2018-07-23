const { securizeEndpoint } = require('../../security');
const apiController = require('./yang-api-controller');
const viewsController = require('./yang-views-controller');

module.exports = (router, middleware) => {
	router.get('/yang', middleware.passport, viewsController.list);
	router.get('/yang/details', middleware.passport, viewsController.details);
	router.get('/yang/edit', middleware.passport, viewsController.edit);
	router.get('/yang/create', middleware.passport, viewsController.create);
	
	router.get('/api/yang', middleware.passport, securizeEndpoint('yang:view'), apiController.getAll);
	router.post('/api/yang', middleware.passport, securizeEndpoint('yang:create'), apiController.create);
	router.put('/api/yang', middleware.passport, securizeEndpoint('yang:edit'), apiController.update);
	router.delete('/api/yang', middleware.passport, securizeEndpoint('yang:delete'), apiController.delete);
	router.get('/api/yang/getById', middleware.passport, securizeEndpoint('yang:view'), apiController.getById);
};
