export default (req, res, config) => {
  const defaultBody = {};

  const body = {
    ...defaultBody,
    ...config
  };

  res.json(body);
};
