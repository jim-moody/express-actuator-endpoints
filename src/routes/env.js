export default (req, res, config) => {
  const defaultBody = {
    ...process.env
  };

  const body = {
    ...defaultBody,
    ...config
  };

  res.json(body);
};
