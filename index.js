
'use strict';

const express = require('express'),
config        = require('./setting/config'),
http          = require('http'),
socket        = require('socket.io');

const app        = express();
const httpServer = http.Server(app);
const io         = socket(httpServer);

io.on('connection', socket => {
	console.log('start socket')
	socket.on('message', data => {
		io.emit('effects', data);
		console.log('message', data);
	});
})

// const ioProm = require('express-socket.io');
// const server = ioProm.init(app);


// global.socket = io;
// io.on('connection', socket => {
// 	console.log('start socket')
// 	_socket = socket;
	
//     socket.emit('hello', 'hello');
// })


// 应用程序加载
require('./setting/express')(app, config);


httpServer.listen(config.port, () => console.log('Express server listening on port ' + config.port))

