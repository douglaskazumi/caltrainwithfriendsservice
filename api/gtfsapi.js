"use strict";

const gtfs = require('gtfs');

module.exports = {
  updateData: updateData
};

function updateData(req, res, config) {
  gtfs.import(config, (err) => {
    res.json({
      result: err || "Success"
    });
  });
}