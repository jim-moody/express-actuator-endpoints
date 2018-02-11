export default (req, res, config) => {
  const defaultBody = {
    status: "UP",
    description: "Your API"
  };

  const body = {
    ...defaultBody,
    ...config
  };

  res.json(body);
};
