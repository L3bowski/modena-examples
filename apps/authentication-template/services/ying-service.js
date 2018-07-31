var nextId = 4;
var yings = [{
	id: 1,
	name: 'Ying 1'
}, {
	id: 2,
	name: 'Ying 2'
}, {
	id: 3,
	name: 'Ying 3'
}];

const create = yingData => {
	var ying = {
		id: nextId++,
		name: yingData.name
	};
	yings.push(ying);
	return ying;
};

const deleteYing = yingId => {
	var ying = yings.find(ying => ying.id === yingId);
	if (ying) {
		yings = yings.filter(ying => ying.id !== yingId);
	}
	return ying;
};

const getAll = () => yings;

const getById = yingId => {
	var ying = yings.find(ying => ying.id === yingId);
	return ying;
};

const update = updatedYing => {
	var ying = yings.find(ying => ying.id === updatedYing.id);
	if (ying) {
		ying.name = updatedYing.name;
	}
	return ying;
};

module.exports = {
	create,
	delete: deleteYing,
	getAll,
	getById,
	update
};
