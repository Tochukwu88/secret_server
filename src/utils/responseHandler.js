export default (res, status, data, message) => {
  res.status(status).json({
    statusCode: status,
    message,
    data,
  });
};
