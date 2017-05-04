const path 	   = require('path'),
	rootPath   = path.normalize(__dirname + '/..'),
	env        = process.env.NODE_ENV || 'production';

console.log('当前环境', env)

const config = {
	root         : rootPath,
	port         : 9088,
	app          : {
		name : 'demo-test',
		local: 'http://bf148f6c.ngrok.io'
	},
	wechat : {
		// Kain 的测试公众号
		appid          : 'wx1020286e395af06c',
		appsecret      : 'd9353526d9ebe7093325b5d2de244af8',
		token          : 'KainAltion',
		encodingAESKey : '',
		url            : 'http://bf148f6c.ngrok.io'
	}
}

module.exports = config;
