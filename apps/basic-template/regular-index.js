const express = require('express');
const server = express();
const { join } = require('path');

server.set('view engine', 'ejs');
server.set('views', join(__dirname, 'views'));

server.use('/', express.static(join(__dirname, 'public')));

server.use('/', (req, res, next) => res.render('index'));

server.listen(80, error => {
	if (error) {
		console.error(error);
	}
	else {
		console.log('Express server listening on port 80');
	}
});
