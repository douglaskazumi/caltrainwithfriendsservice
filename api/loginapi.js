"use strict";

var util = require("../util");

module.exports = {
  login: login
};

function login(req, res) {

  var user = req.body.payload;
  util.prettyPrint(user.loginId, "request");
  
  var session = req.session;
  util.prettyPrint(session, "session");

  res.json({
    payload: {
      authenticationState: "SUCCESS",
      firstName: "User"
    }
  });
}