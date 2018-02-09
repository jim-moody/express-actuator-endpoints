'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));

var health = (function (req, res) {
  res.json({
    status: "UP",
    description: "Your API"
  });
});

var info = (function (req, res) {
  res.json({
    info: "some info"
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
