const create = (req, res, next) => res.render('yang-edit', {
	yangId: null
});

const details = (req, res, next) => res.render('yang-details', {
	yangId: parseInt(req.query.id)
});

const edit = (req, res, next) => res.render('yang-edit', {
	yangId: parseInt(req.query.id)
});

const list = (req, res, next) => res.render('yang-list');

module.exports = {
	create,
	details,
	edit,
	list
};
