"use strict";

// Basic configuration
var app = require("express")();
var bodyParser = require("body-parser");
var session = require('express-session');
const mongoose = require('mongoose');
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

app.use(bodyParser.json());
app.use(session({
	secret: 'secret'
}));
app.set("port", process.env.PORT || 3000);
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUrl);

// API
var gtfsapi = require("./api/gtfsapi");
app.get("/updateData", function(req, res) {
	gtfsapi.updateData(req, res, config);
});

var caltrain = require("./api/caltrain");
app.get("/stations", caltrain.getStations);

app.listen(app.get("port"), () => {
	console.log(`Listening on port ${app.get("port")}...`);
});