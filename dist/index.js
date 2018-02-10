'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var appRoot = _interopDefault(require('app-root-path'));

var health = (function (req, res) {
  res.json({
    status: "UP",
    description: "Your API"
  });
});

/* eslint-disable global-require */
var gitInfo = function gitInfo() {
  try {
    return require(appRoot + "/git.properties.json");
  } catch (e) {
    console.warn("No git.properties.json file found at app root, use https://www.npmjs.com/package/node-git-info-json to generate this file");
    return Error("No git properties file found at app root");
  }
};

var info = (function (req, res) {
  var git = gitInfo() || {};
  res.json({
    git: git
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
