const securizeEndpoint = (requiredPermission, errorCode, errorMessage) => {
	errorCode = errorCode != undefined ? errorCode : 401;
	errorMessage = errorMessage != undefined ?
		errorMessage :
		'You are not allowed to perform the requested operation';

	return (req, res, next) => userHasPermission(req.user, requiredPermission) ?
		next() :
		res.status(errorCode).json(errorMessage);
}

const userHasPermission = (user, permission) => user && user.permissions.indexOf(permission) > -1;

module.exports = {
	securizeEndpoint,
	userHasPermission
};