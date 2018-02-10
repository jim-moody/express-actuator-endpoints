import express from "express";
import request from "supertest";
import fs from "fs";
import appRoot from "app-root-path";

import middleware from "../../dist/index";

const app = express();
app.use(middleware());

describe("GET /info", () => {
  it("should return json with a 200 response", () =>
    request(app)
      .get("/info")
      .expect("Content-Type", /json/)
      .expect(200));
  it("should return empty object for git when no git properties file is defined", () =>
    request(app)
      .get("/info")
      .then(({ body }) => expect(body.git).toEqual({})));

  it("should return git properties when a git.properties.json file exists", () => {
    const filePath = `${appRoot}/git.properties.json`;
    const gitInfo = {
      test: "Test Git Info"
    };
    fs.writeFileSync(filePath, JSON.stringify(gitInfo));
    return request(app)
      .get("/info")
      .then(response => expect(response.body.git).toEqual(gitInfo))
      .then(() => fs.unlinkSync(filePath));
  });
});

describe("GET /health", () => {
  it("should return expected JSON with a 200 response", () => {
    const healthBody = {
      description: "Your API",
      status: "UP"
    };
    request(app)
      .get("/health")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => expect(body).toEqual(healthBody));
  });
});

describe("GET /env", () => {
  it("should return process.env as JSON with a 200 response", () => {
    request(app)
      .get("/env")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => expect(body).toEqual({ env: process.env }));
  });
});
