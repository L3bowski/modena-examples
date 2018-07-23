const { join } = require('path');
const { runServer } = require('modena');

/* The configuration should be stored in a separate file, not tracked by the source control management */
const config = {
	PORT: 80,
	defaultApp: "modena-simple-app",
    sessionSecret: "ssshhhhh",
    enableConsoleLogs: "true",
    logFilename: "development.log",
    tracerLevel: "log"
};

runServer(config);