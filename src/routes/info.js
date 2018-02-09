let gitInfo;
try {
  const appRoot = require("app-root-path");
  gitInfo = require(`${appRoot}/git.properties.json`);
} catch (e) {
  console.log(
    "Add a git.properties.json to serve up git info at this endpoint"
  );
}

export default (req, res) => {
  const info = {};
  if (gitInfo) {
    info.git = gitInfo;
  }
  res.json({
    info
  });
};
