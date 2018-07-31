const UsersController = (usersService) => {

    const create = (req, res, next) => {
        var user = req.body;
        return usersService.create(user)
            .then(user => res.json(user));
    };

    const deleteUser = (req, res, next) => {
        const id = req.query.id;
        return usersService.deleteUser(id)
            .then(user => res.json(user));
    };

    const getAll = (req, res, next) => {
        const keywords = req.query.keywords;
        const page = parseInt(req.query.page) || 0;
        const pageSize = parseInt(req.query.pageSize) || 10;
        return usersService.getAll(keywords, page, pageSize)
            .then(users => res.json(users));
    };

    const getById = (req, res, next) => {
        const id = req.query.id;
        return usersService.getById(id)
            .then(user => res.json(user));
    };

    const update = (req, res, next) => {
        var userData = req.body;
        return usersService.update(userData)
            .then(user => res.json(user));
    };

    return {
        create,
        deleteUser,
        getAll,
        getById,
        update
    };
};

module.exports = UsersController;
