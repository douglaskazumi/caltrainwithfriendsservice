"use strict";

var util = require("../util");
var fs = require('fs');
var pg = require('pg');
var copyFrom = require('pg-copy-streams').from;

module.exports = {
  login: login
};

function login(req, res) {

  // var user = req.body.payload;
  // util.prettyPrint(user.loginId, "request");
  
  // var session = req.session;
  // util.prettyPrint(session, "session");

  // res.json({
  //   payload: {
  //     authenticationState: "SUCCESS",
  //     firstName: "User"
  //   }
  // });

  pg.connect(CONNECT_STR, function(err, client, done) {
    var stream = client.query(copyFrom('COPY agency FROM STDIN'));
    var fileStream = fs.createReadStream('agency.txt')
    fileStream.on('error', done);
    fileStream.pipe(stream).on('finish', done).on('error', done);
  });

}