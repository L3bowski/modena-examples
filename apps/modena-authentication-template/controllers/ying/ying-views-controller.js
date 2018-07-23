const create = (req, res, next) => res.render('ying-edit', {
	yingId: null
});

const details = (req, res, next) => res.render('ying-details', {
	yingId: parseInt(req.query.id)
});

const edit = (req, res, next) => res.render('ying-edit', {
	yingId: parseInt(req.query.id)
});

const list = (req, res, next) => res.render('ying-list');

module.exports = {
	create,
	details,
	edit,
	list
};
