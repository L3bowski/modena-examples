const { securizeEndpoint } = require('../../security');
const apiController = require('./ying-api-controller');
const viewsController = require('./ying-views-controller');

module.exports = (router, passportMiddleware) => {
	router.get('/ying', passportMiddleware, viewsController.list);
	router.get('/ying/details', passportMiddleware, viewsController.details);
	router.get('/ying/edit', passportMiddleware, viewsController.edit);
	router.get('/ying/create', passportMiddleware, viewsController.create);
	
	router.get('/api/ying', passportMiddleware, securizeEndpoint('ying:view'), apiController.getAll);
	router.post('/api/ying', passportMiddleware, securizeEndpoint('ying:create'), apiController.create);
	router.put('/api/ying', passportMiddleware, securizeEndpoint('ying:edit'), apiController.update);
	router.delete('/api/ying', passportMiddleware, securizeEndpoint('ying:delete'), apiController.delete);
	router.get('/api/ying/getById', passportMiddleware, securizeEndpoint('ying:view'), apiController.getById);
};
