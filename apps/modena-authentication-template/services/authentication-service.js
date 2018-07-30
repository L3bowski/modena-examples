const { userHasPermission } = require('../security');

var users = [{
	id: 1,
	username: 'ying',
	password: 'ying',
	permissions: ['ying:view', 'ying:create', 'ying:edit', 'ying:delete']
}, {
	id: 2,
	username: 'yang',
	password: 'yang',
	permissions: ['yang:view', 'yang:create', 'yang:edit', 'yang:delete']
}];

const userAuthenticator = (username, password) => {
	var user = users.find(user => user.username === username && user.password === password);
	return Promise.resolve(user);
};

const userDeserializer = userId => {
	var user = users.find(user => user.id === parseInt(userId));
	return Promise.resolve(user);
};

const getClientSideInfo = (user, permissions) => {
	var parsedUser = null;
	if (user) {
		parsedUser = {
			id: user.id,
			username: user.username,
			permissions: []
		};
		permissions = permissions || [];
		permissions.forEach(permission => {
			if (typeof permission === "string" && userHasPermission(user, permission)) {
				parsedUser.permissions.push(permission);
			}
		});
	}
	return parsedUser;
};

module.exports = {
	getClientSideInfo,
	userAuthenticator,
	userDeserializer
};
