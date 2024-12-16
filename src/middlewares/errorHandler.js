export const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
    data: err.message,
  });
};
