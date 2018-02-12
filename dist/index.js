'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var health = (function (req, res, config) {
  var defaultBody = {
    status: "UP",
    description: "Your API"
  };

  var body = _extends({}, defaultBody, config);

  res.json(body);
});

var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var info = (function (req, res, config) {
  var defaultBody = {};

  var body = _extends$1({}, defaultBody, config);

  res.json(body);
});

var _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var env = (function (req, res, config) {
  var defaultBody = {
    systemEnvironment: _extends$2({}, process.env)
  };

  var body = _extends$2({}, defaultBody, config);

  res.json(body);
});

var configureController = function configureController(controller, options) {
  return function (req, res) {
    controller(req, res, options);
  };
};

var index = (function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { health: {}, info: {}, env: {} };

  var router = express.Router();

  router.get("/health", configureController(health, config.health));
  router.get("/info", configureController(info, config.info));
  router.get("/env", configureController(env, config.env));

  return router;
});

module.exports = index;
