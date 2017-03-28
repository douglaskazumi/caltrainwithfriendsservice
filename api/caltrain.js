"use strict";

const util = require("../util");
const gtfs = require('gtfs');

module.exports = {
	getStations: getStations
};

function getStations(req, res) {
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