const notFoundHandler = (reg, res, next) => {
  res.status(404).json({
    status: 404,
    message: 'Route not found',
    error: res.message,
  });
};

export default notFoundHandler;
