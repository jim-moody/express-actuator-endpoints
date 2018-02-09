import express from "express";
import health from "./routes/health";
import info from "./routes/info";
import env from "./routes/env";

export default () => {
  const router = express.Router();

  router.get("/health", health);
  router.get("/info", info);
  router.get("/env", env);

  return router;
};
