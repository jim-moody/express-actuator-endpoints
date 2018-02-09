const appRoot =require("app-root-path")
const gitInfo = require(appRoot + "/git.properties.json";

export default (req, res) => {
  res.json({
    git: gitInfo
  });
};
