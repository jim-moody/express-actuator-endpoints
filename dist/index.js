'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));

var health = (function (req, res) {
  res.json({
    status: "UP",
    description: "Your API"
  });
});

var gitInfo = void 0;
try {
  var appRoot = require("app-root-path");
  gitInfo = require(appRoot + "/git.properties.json");
} catch (e) {
  console.log("Add a git.properties.json to serve up git info at this endpoint");
}

var info = (function (req, res) {
  var info = {};
  if (gitInfo) {
    info.git = gitInfo;
  }
  res.json({
    info: info
  });
});

var env = (function (req, res) {
  res.json({
    env: process.env
  });
});

var index = (function () {
  var router = express.Router();

  router.get("/health", health);
  router.get("/info", info);
  router.get("/env", env);

  return router;
});

module.exports = index;
