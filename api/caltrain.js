"use strict";

const util = require("../util");
const mongoose = require('mongoose');
const gtfs = require('gtfs');
const config = {
	mongoUrl: 'mongodb://heroku_qlj2qlvm:lujsle7k5gqhkqbc6101ckev7v@ds137230.mlab.com:37230/heroku_qlj2qlvm',
	agencies: [{
		agency_key: 'Caltrain',
		url: 'http://www.caltrain.com/Assets/GTFS/caltrain/CT-GTFS.zip',
		exclude: [
			'shapes'
		]
	}]
};

module.exports = {
	getStations: getStations
};

function getStations(req, res) {
	mongoose.Promise = global.Promise;
	mongoose.connect(config.mongoUrl);
	gtfs.getStops('Caltrain', (err, stops) => {
		var clean = stops.filter(function(el) {
			return el.stop_id < 100000;
		});

		var deduplicated = util.uniqueBy(clean, function(item) {
			return item.stop_name;
		});

		var sorted = deduplicated.sort(function(one, other) {
			return one.stop_id - other.stop_id;
		});

		res.json(sorted);
	});
}