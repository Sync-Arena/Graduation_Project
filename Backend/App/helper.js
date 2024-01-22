export const resGen = function (res, statusCode, apiStatus, message, data) {
  res.status(statusCode).send({
    apiStatus,
    message,
    data,
  });
};

