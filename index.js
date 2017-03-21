"use strict";

// Basic configuration
var app = require("express")();
var bodyParser = require("body-parser");
var session = require('express-session');

app.use(bodyParser.json());
app.use(session({secret: 'secret'}));
app.set("port", process.env.PORT || 3000);

// API
var loginapi = require("./api/loginapi");
app.post("/login", loginapi.login);


app.listen(app.get("port"), () => {
  console.log(`Listening on port ${app.get("port")}...`);
});
