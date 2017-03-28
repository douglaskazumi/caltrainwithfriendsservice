"use strict";

const util = require("../util");
const gtfs = require('gtfs');
const mongoose = require('mongoose');
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
  updateData: updateData
};

function updateData(req, res) {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.mongoUrl);
  gtfs.import(config, (err) => {
    res.json({
      result: err || "Success"
    });
  });
}