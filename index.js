const { runServer } = require('modena');

/* The configuration should be stored in a separate file, not tracked by the source control management */
const config = {
	PORT: 80,
	DEFAULT_APP: 'basic-template',
    SESSION_SECRET: 'ssshhhhh',
    ENABLE_CONSOLE_LOGS: 'true',
    LOG_FILENAME: 'development.log',
    TRACER_LEVEL: 'log',

    'database-api-template_db_host': 'db_host',
    'database-api-template_db_name': 'db_name',
    'database-api-template_db_user': 'db_user',
    'database-api-template_db_password': 'db_password'
};

runServer(config);
