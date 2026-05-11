/**
 * Custom error response class
 * Extends native Error with a status code
 */
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Capture stack trace (v8 specific)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;
