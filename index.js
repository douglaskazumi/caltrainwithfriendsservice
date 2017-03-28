"use strict";

// Basic configuration
var app = require("express")();
var bodyParser = require("body-parser");
var session = require('express-session');
const mongoose = require('mongoose');
var Router = require('./router');
var config = {
	mongoUrl: 'mongodb://heroku_qlj2qlvm:lujsle7k5gqhkqbc6101ckev7v@ds137230.mlab.com:37230/heroku_qlj2qlvm',
	agencies: [{
		agency_key: 'Caltrain',
		url: 'http://www.caltrain.com/Assets/GTFS/caltrain/CT-GTFS.zip',
		exclude: [
			'shapes'
		]
	}]
};

mongoose.connection.on("connected", function(ref) {
	app.use(bodyParser.json());
	app.use(session({
		secret: 'secret'
	}));
	app.set("port", process.env.PORT || 3000);

	var router = new Router(app, config);

	app.listen(app.get("port"), () => {
		console.log(`Listening on port ${app.get("port")}...`);
	});
});


var disconnectDb = function() { 
  mongoose.connection.close(function () {
    process.exit(0);
  });
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', disconnectDb).on('SIGTERM', disconnectDb);

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUrl);