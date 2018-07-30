const { runServer } = require('modena');

/* The configuration should be stored in a separate file, not tracked by the source control management */
const config = {
	PORT: 80,
	defaultApp: 'modena-template',
    sessionSecret: 'ssshhhhh',
    enableConsoleLogs: 'true',
    logFilename: 'development.log',
    tracerLevel: 'log',

    'modena-database-api-template_db_host': 'db_host',
    'modena-database-api-template_db_name': 'db_name',
    'modena-database-api-template_db_user': 'db_user',
    'modena-database-api-template_db_password': 'db_password'
};

runServer(config);
