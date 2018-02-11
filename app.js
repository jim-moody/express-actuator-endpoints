import express from "express";
import actuator from "./dist/index";
import gitInfo from "./git.properties.json";

const app = express();

const config = {
  health: {
    description: "Jim's App",
    test: "test"
  },
  info: {
    ...gitInfo
  }
};
app.use(actuator(config));

app.listen(3000, () => console.log("Listening on 3000"));
