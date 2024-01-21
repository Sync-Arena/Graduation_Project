const fs = require("fs");

const resGen = function (res, statusCode, apiStatus, message, data) {
  res.status(statusCode).send({
    apiStatus,
    message,
    data,
  });
};


module.exports = {
  resGen,
};
