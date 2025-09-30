"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.errorHandler = exports.AppError = void 0;
const logger_1 = require("../utils/logger");
class AppError extends Error {
    statusCode;
    isOperational;
    constructor(message, statusCode, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof AppError)) {
        logger_1.logger.error('Unexpected error:', error);
        error = new AppError(process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : error.message, 500, false);
    }
    logger_1.logger.error({
        error: {
            message: error.message,
            statusCode: error.statusCode,
            stack: error.stack,
        },
        request: {
            method: req.method,
            url: req.url,
            ip: req.ip,
            userAgent: req.get('user-agent'),
        },
    });
    res.status(error.statusCode).json({
        error: {
            message: error.message,
            ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
        },
    });
};
exports.errorHandler = errorHandler;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=errorHandler.js.map