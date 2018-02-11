import express from "express";
import health from "./routes/health";
import info from "./routes/info";
import env from "./routes/env";

const configureController = (controller, options) => (req, res) => {
  controller(req, res, options);
};

export default (config = { health: {}, info: {}, env: {} }) => {
  const router = express.Router();

  router.get("/health", configureController(health, config.health));
  router.get("/info", configureController(info, config.info));
  router.get("/env", configureController(env, config.env));

  return router;
};
