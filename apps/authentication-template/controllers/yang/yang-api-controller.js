const yangService = require('../../services/yang-service');

const create = (req, res, next) => {
	var yang = yangService.create(req.body);
	return res.json(yang);
};

const deleteYang = (req, res, next) => {
	var yang = yangService.delete(parseInt(req.body.id));
	return res.json(yang);
};

const getAll = (req, res, next) => {
	var yangs = yangService.getAll();
	return res.json(yangs);
};

const getById = (req, res, next) => {
	var yang = yangService.getById(parseInt(req.query.id));
	return res.json(yang);
};

const update = (req, res, next) => {
	var updatedYang = req.body;
	var yang = yangService.update(updatedYang);
	return res.json(yang);
};

module.exports = {
	create,
	delete: deleteYang,
	getAll,
	getById,
	update
};
