const { securizeEndpoint } = require('../../security');
const apiController = require('./yang-api-controller');
const viewsController = require('./yang-views-controller');

module.exports = (router, passportMiddleware) => {
	router.get('/yang', passportMiddleware, viewsController.list);
	router.get('/yang/details', passportMiddleware, viewsController.details);
	router.get('/yang/edit', passportMiddleware, viewsController.edit);
	router.get('/yang/create', passportMiddleware, viewsController.create);
	
	router.get('/api/yang', passportMiddleware, securizeEndpoint('yang:view'), apiController.getAll);
	router.post('/api/yang', passportMiddleware, securizeEndpoint('yang:create'), apiController.create);
	router.put('/api/yang', passportMiddleware, securizeEndpoint('yang:edit'), apiController.update);
	router.delete('/api/yang', passportMiddleware, securizeEndpoint('yang:delete'), apiController.delete);
	router.get('/api/yang/getById', passportMiddleware, securizeEndpoint('yang:view'), apiController.getById);
};
