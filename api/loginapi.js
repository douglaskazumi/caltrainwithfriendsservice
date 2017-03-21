"use strict";

var util = require("../util");
var fs = require('fs');
var pg = require('pg');
var copyFrom = require('pg-copy-streams').from;
var CONNECT_STR = "postgres://fynagptazuhshp:cd46bfaf49d11c7d8ddc88b20748e14bf9f6ee57eb9a8ca1ee4ed12319956742@ec2-23-21-213-202.compute-1.amazonaws.com:5432/dc70sfo9r0d4rs";

module.exports = {
  login: login,
  getData: getData
};

function login(req, res) {

  // var user = req.body.payload;
  // util.prettyPrint(user.loginId, "request");

  // var session = req.session;
  // util.prettyPrint(session, "session");



  pg.connect(CONNECT_STR, function(err, client, done) {
    var stream = client.query(copyFrom('COPY agency FROM STDIN'));
    var fileStream = fs.createReadStream('../data/agency.txt')
    fileStream.on('error', done);
    fileStream.pipe(stream).on('finish', done).on('error', done);
  });

  res.json({
    payload: {
      authenticationState: "SUCCESS",
      firstName: "User"
    }
  });

}

function getData(req, res) {
  pg.connect(CONNECT_STR, function(err, client, done) {
    var stream = client.query('SELECT * FROM agency');

    res.json({
      data: stream
    });
  });
}