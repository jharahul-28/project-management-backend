import { constants } from "../constants.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  console.error(err);

  const response = {
    title: getErrorTitle(statusCode),
    message: err.message,
    stackTrace: process.env.NODE_ENV === 'production' ? '' : err.stack,
  };

  res.json(response);
};

const getErrorTitle = (statusCode) => {
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      return "Validation Failed";
    case constants.UNAUTHORIZED:
      return "Unauthorized";
    case constants.FORBIDDEN:
      return "Forbidden";
    case constants.NOT_FOUND:
      return "Not Found";
    case constants.SERVER_ERROR:
      return "Server Error";
    default:
      return "Error";
  }
};

export default errorHandler;
