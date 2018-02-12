export default (req, res, config) => {
  const defaultBody = {
    systemEnvironment: {
      ...process.env
    }
  };

  const body = {
    ...defaultBody,
    ...config
  };

  res.json(body);
};
