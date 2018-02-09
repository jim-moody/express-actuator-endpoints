import express from "express";
import actuator from "./dist/index";

const app = express();

app.use(actuator());

app.listen(3000, () => console.log("Listening on 3000"));
