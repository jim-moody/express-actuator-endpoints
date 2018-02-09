# Express Actuator Endpoints

This module is an express middleware that exposes endpoints that somewhat mimic the behavior of [Spring Boot Actuator](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-actuator)

All responses are in JSON format.

## Installation

```sh
npm i --S express-actuator-endpoints
```

## Usage

```js
import express from "express";
import actuator from "express-actuator-endpoints";

const app = express();
app.use(actuator());
```

## Endpoints

| Endpoint | Response                                                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| /health  | Responds with a `status` of "UP" and a default `description`                                                                                |
| /info    | Responds with the last git commit info when used in conjunction with [node-git-info-json](https://www.npmjs.com/package/node-git-info-json) |
| /env     | Responds with `process.env`                                                                                                                 |
