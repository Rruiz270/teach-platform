"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPasswordResetToken = exports.generatePasswordResetToken = exports.verifyEmailToken = exports.generateEmailVerificationToken = exports.verifyToken = exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = require("../middleware/errorHandler");
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30d';
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '90d';
const generateTokens = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });
    return {
        accessToken,
        refreshToken,
    };
};
exports.generateTokens = generateTokens;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new errorHandler_1.AppError('Token expired', 401);
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw new errorHandler_1.AppError('Invalid token', 401);
        }
        throw error;
    }
};
exports.verifyToken = verifyToken;
const generateEmailVerificationToken = (email) => {
    return jsonwebtoken_1.default.sign({ email }, JWT_SECRET, { expiresIn: '24h' });
};
exports.generateEmailVerificationToken = generateEmailVerificationToken;
const verifyEmailToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        throw new errorHandler_1.AppError('Invalid or expired verification token', 400);
    }
};
exports.verifyEmailToken = verifyEmailToken;
const generatePasswordResetToken = (userId, email) => {
    return jsonwebtoken_1.default.sign({ userId, email }, JWT_SECRET, { expiresIn: '1h' });
};
exports.generatePasswordResetToken = generatePasswordResetToken;
const verifyPasswordResetToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        throw new errorHandler_1.AppError('Invalid or expired reset token', 400);
    }
};
exports.verifyPasswordResetToken = verifyPasswordResetToken;
//# sourceMappingURL=jwt.js.map