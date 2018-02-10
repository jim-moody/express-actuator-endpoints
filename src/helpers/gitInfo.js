import appRoot from "app-root-path";
/* eslint-disable global-require */
const gitInfo = () => {
  try {
    return require(`${appRoot}/git.properties.json`);
  } catch (e) {
    console.warn(
      "No git.properties.json file found at app root, use https://www.npmjs.com/package/node-git-info-json to generate this file"
    );
    return Error("No git properties file found at app root");
  }
};

export default gitInfo;
