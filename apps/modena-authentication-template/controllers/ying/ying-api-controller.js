const yingService = require('../../services/ying-service');

const create = (req, res, next) => {
	var ying = yingService.create(req.body);
	return res.json(ying);
};

const deleteYing = (req, res, next) => {
	var ying = yingService.delete(parseInt(req.body.id));
	return res.json(ying);
};

const getAll = (req, res, next) => {
	var yings = yingService.getAll();
	return res.json(yings);
};

const getById = (req, res, next) => {
	var ying = yingService.getById(parseInt(req.query.id));
	return res.json(ying);
};

const update = (req, res, next) => {
	var updatedYing = req.body;
	var ying = yingService.update(updatedYing);
	return res.json(ying);
};

module.exports = {
	create,
	delete: deleteYing,
	getAll,
	getById,
	update
};
