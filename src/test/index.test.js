import express from "express";
import request from "supertest";
import fs from "fs";
import appRoot from "app-root-path";

import middleware from "../index";

let app;

describe("GET /info", () => {
  beforeEach(() => {
    app = express();
    app.use(middleware());
  });

  test("should return json with a 200 response", () =>
    request(app)
      .get("/info")
      .expect("Content-Type", /json/)
      .expect(200));

  test("should return empty object for git when no git properties file is defined", () =>
    request(app)
      .get("/info")
      .then(({ body }) => expect(body).toEqual({})));
});

describe("GET /health", () => {
  beforeEach(() => {
    app = express();
    app.use(middleware());
  });

  test("should return expected JSON with a 200 response", () => {
    const healthBody = {
      description: "Your API",
      status: "UP"
    };
    return request(app)
      .get("/health")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => expect(body).toEqual(healthBody));
  });
});

describe("GET /env", () => {
  beforeEach(() => {
    app = express();
    app.use(middleware());
  });
  test("should return process.env as JSON with a 200 response", () =>
    request(app)
      .get("/env")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) =>
        expect(body).toEqual({ systemEnvironment: { ...process.env } })
      ));
});

describe("Custom Configuration", () => {
  let configApp;

  beforeEach(() => {
    configApp = express();
  });

  test("/health should return additional properties passed in as config object", () => {
    const config = {
      health: {
        description: "New description",
        newProperty: "New Value"
      }
    };
    const expectedBody = {
      description: "New description",
      status: "UP",
      newProperty: "New Value"
    };
    configApp.use(middleware(config));

    return request(configApp)
      .get("/health")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => expect(body).toEqual(expectedBody));
  });
  test("/info should return additional properties passed in as config object", () => {
    const config = {
      info: {
        test1: "test1",
        test2: "test2"
      }
    };
    const expectedBody = {
      test1: "test1",
      test2: "test2"
    };
    configApp.use(middleware(config));

    return request(configApp)
      .get("/info")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => expect(body).toEqual(expectedBody));
  });

  test("/env should return additional properties passed in as config object", () => {
    const config = {
      env: {
        test4: "test4",
        test5: "test5"
      }
    };
    const expectedBody = {
      test4: "test4",
      test5: "test5",
      systemEnvironment: {
        ...process.env
      }
    };
    configApp.use(middleware(config));

    return request(configApp)
      .get("/env")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => expect(body).toEqual(expectedBody));
  });

  test("/info should return git properties when a git.properties.json file is passed in", () => {
    const filePath = `${appRoot}/git.properties.json`;
    const gitInfo = {
      test: "Test Git Info"
    };
    fs.writeFileSync(filePath, JSON.stringify(gitInfo));

    const json = require(filePath); // eslint-disable-line global-require

    const config = {
      info: {
        git: json
      }
    };
    configApp.use(middleware(config));

    return request(configApp)
      .get("/info")
      .then(response => expect(response.body.git).toEqual(json))
      .then(() => fs.unlinkSync(filePath));
  });
});
