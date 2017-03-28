module.exports = Router;

function Router(app, config) {
	var gtfsapi = require("./api/gtfsapi");
	app.get("/updateData", function(req, res) {
		gtfsapi.updateData(req, res, config);
	});

	var caltrain = require("./api/caltrain");
	app.get("/stations", caltrain.getStations);
}