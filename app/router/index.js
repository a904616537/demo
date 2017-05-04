'use strict';

var express = require('express'),
router      = express.Router(),
config      = require('../../setting/config'),
webLogin    = require('web-wechat-login');
// ioProm      = require('express-socket.io');

const wechat = new webLogin({
	appId       : config.wechat.appid,
	appSecret   : config.wechat.appsecret,
	callbackUrl : config.wechat.url + '/wechat/callback'
});


// ioProm.then(io => {
// 	io.on('connection', socket => {
// 		console.log('Connected!');
// 		socket.on('message', data => {
// 			socket.emit('effects', data);
// 			console.log('message', data);
// 		});
// 	})
// })


router.route('/')
.get((req, res) => {
	var user = req.session.user;
	res.render('home', {user})
})

router.route('/effects')
.get((req, res) => {
	res.render('effects')
})

router.route('/wechat/url')
.get((req, res) => {
	var loginUrl = wechat.loginUrl();
	var authorizeUrl = wechat.authorizeUrl();
	res.send({'qrcode':loginUrl, 'author': authorizeUrl});
})

/* listen wechat callback. */
router.all('/wechat/callback', (req, res) => {
	wechat.callback(req, res).then(result => {
		var user = {
			openid     : result.openid,
			unionid    : result.unionid,
			nickname   : result.nickname,
			headimgurl : result.headimgurl,
			sex        : result.sex
		};
		req.session.user = user;
		res.redirect('/')
	}).catch(err => {
		res.send('err' + err);
	});
});

module.exports = app => {
	app.use('/', router);
}