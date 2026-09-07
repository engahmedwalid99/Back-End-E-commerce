class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = Number(statusCode).toString().startsWith("4")
      ? "fail"
      : "error";
    this.isOperational = true;
  }
}

module.exports = AppError;
