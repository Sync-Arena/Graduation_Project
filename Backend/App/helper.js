import fs from "fs";

const resGen = function (res, statusCode, apiStatus, message, data) {
  res.status(statusCode).send({
    apiStatus,
    message,
    data,
  });
};

export default resGen;
