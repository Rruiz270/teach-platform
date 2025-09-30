"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.authorize = exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const errorHandler_1 = require("./errorHandler");
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new errorHandler_1.AppError('No token provided', 401);
        }
        const token = authHeader.split(' ')[1];
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authenticate = authenticate;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new errorHandler_1.AppError('Authentication required', 401));
        }
        if (!roles.includes(req.user.role)) {
            return next(new errorHandler_1.AppError('Insufficient permissions', 403));
        }
        next();
    };
};
exports.authorize = authorize;
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const decoded = (0, jwt_1.verifyToken)(token);
            req.user = decoded;
        }
    }
    catch (error) {
    }
    next();
};
exports.optionalAuth = optionalAuth;
//# sourceMappingURL=auth.js.map