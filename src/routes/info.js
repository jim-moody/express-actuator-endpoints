import gitInfo from "../helpers/gitInfo";

export default (req, res) => {
  const git = gitInfo() || {};
  res.json({
    git
  });
};
