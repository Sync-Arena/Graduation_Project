export const resGen = function (res, statusCode, apiStatus, message, data) {
  res.status(statusCode).json({
    apiStatus,
    message,
    data,
  });
};

