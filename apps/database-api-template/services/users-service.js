const usersService = models => {

	const create = userData => models.User.create(userData);

	const deleteUser = id => {
		return models.User.findById(id)
		.then(user => user.destroy());
	};

	const getAll = (filter, page, pageSize) => {
		page = page || 0;
		pageSize = pageSize || 10;
		const findOptions = {
			limit: pageSize,
      		offset: page * pageSize,
		};
		if (filter) {
			findOptions.where = {
				name: {
					$like: `%${filter}%`
				}
			};
		}
		return models.User.findAll(findOptions);
	};

	const getById = id => models.User.findById(id);

	const update = userData => {
		const userFields = {
			Name: userData.Name
		};
		const updateOptions = {
			where: {
				Id: userData.Id
			}
		};

		return models.User.update(userFields, updateOptions)
			.then(affectedRows => models.User.findById(userData.Id));
	};

	return {
		create,
		deleteUser,
		getAll,
		getById,
		update
	};
};

module.exports = usersService;
