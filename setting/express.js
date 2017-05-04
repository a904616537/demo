
'use strict';

const express  = require('express'),
glob           = require('glob'),
logger         = require('morgan'),
cookieParser   = require('cookie-parser'),
bodyParser     = require('body-parser'),
methodOverride = require('method-override'),
ejs            = require('ejs'),
cors           = require('cors'),
session        = require('express-session');


module.exports = (app, config) => {
    app.use(express.static(config.root + '/public/'))

    app.engine('html', ejs.__express);
    app.set('views', config.root + '/public');
    app.set('view engine', 'html');

    app.use(logger('dev'))
    app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({
			extended : true,
			limit    : 2000000
		})
    )

    app.use(methodOverride());
    app.use(cookieParser());

    app.use(session({
		name              : 'demo',
		secret            : 'secret',
		// store             : new mongoStore({url: config.mongo, autoRemove: 'native', ttl: 0.5 * 60 * 60 }),
		saveUninitialized : true,
		resave            : false,
		cookie            : { httpOnly: true, maxAge: 1000 * 3600 * 24 }
    }));
    
    app.use(cors({
        origin               : "*",
        methods              : "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders       : ['Content-Type', 'Content-Length', 'token', 'Accept', 'X-Requested-With'],
        exposedHeaders       : ['Content-Range', 'X-Content-Range'],
        preflightContinue    : false,
        optionsSuccessStatus : 204
    }))


    // express 路由处理
    const routers = glob.sync(config.root + '/app/router/*.js');
    routers.forEach(router => {
        console.log('Loading Router：', router)
        require(router)(app)
    })

    app.use((req, res, next) => {
        var err = new Error('Not Found')
        err.status = 404
        res.send('404', {
            message : '您访问的页面不存在',
            error   : err,
            title   : '404'
        })
    })

    // app.use((err, req, res, next) => {
    //     res.status(err.status || 500)
    //     res.send('error', {
    //         message: err.message,
    //         error  : {},
    //         title  : 'error'
    //     })
    // })
    
}