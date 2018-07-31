const usersService = models => {

	const create = userData => models.User.create(userData);

	const deleteUser = id => {
		return models.User.findById(id)
		.then(user => user.destroy());
	};

	const getAll = (filter, page, pageSize) => {
		return models.User.findAll({
			include: [{
				model: models.Skill,
				as: 'Skills'
			}],
			where: {
				name: {
					$like: `%${filter}%`
				}
			},
			limit: pageSize,
      		offset: page * pageSize,
		});
	};

	const getById = id => models.User.findById(id, {
		include: [{
			model: models.Skill,
			as: 'Skills'
		}]
	});

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
