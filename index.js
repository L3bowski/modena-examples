const { runServer } = require('modena');

/* The configuration should be stored in a separate file, not tracked by the source control management */
const config = {
	PORT: '80',
	DEFAULT_APP: 'basic-template',
    SESSION_SECRET: 'ssshhhhh',
    LOG_FILENAME: 'development.log',

    'DATABASE_API_TEMPLATE__DB_HOST': 'db_host',
    'DATABASE_API_TEMPLATE__DB_NAME': 'db_name',
    'DATABASE_API_TEMPLATE__DB_USER': 'db_user',
    'DATABASE_API_TEMPLATE__DB_PASSWORD': 'db_password'
};

runServer(config);
