var nextId = 4;
var yangs = [{
	id: 1,
	name: 'Yang 1'
}, {
	id: 2,
	name: 'Yang 2'
}, {
	id: 3,
	name: 'Yang 3'
}];

const create = yangData => {
	var yang = {
		id: nextId++,
		name: yangData.name
	};
	yangs.push(yang);
	return yang;
};

const deleteYang = yangId => {
	var yang = yangs.find(yang => yang.id === yangId);
	if (yang) {
		yangs = yangs.filter(yang => yang.id !== yangId);
	}
	return yang;
};

const getAll = () => yangs;

const getById = yangId => {
	var yang = yangs.find(yang => yang.id === yangId);
	return yang;
};

const update = updatedYang => {
	var yang = yangs.find(yang => yang.id === updatedYang.id);
	if (yang) {
		yang.name = updatedYang.name;
	}
	return yang;
};

module.exports = {
	create,
	delete: deleteYang,
	getAll,
	getById,
	update
};
