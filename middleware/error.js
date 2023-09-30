export const ErrorMiddleWare = (err, req, res, next) => {
  err.statusCode = err.response?.status || 500;
  err.statusText = err?.response?.statusText;
  err.message = err.response?.data?.error;
  err.code = err.response?.data?.code;
  res.status(err.statusCode).json({ status: false, statusText: err.statusText, message: err.message });
};
