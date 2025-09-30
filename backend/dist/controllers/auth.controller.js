"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errorHandler_1 = require("../middleware/errorHandler");
const errorHandler_2 = require("../middleware/errorHandler");
const auth_service_1 = require("../services/auth.service");
const user_service_1 = require("../services/user.service");
const queues_1 = require("../config/queues");
const jwt_1 = require("../utils/jwt");
const logger_1 = require("../utils/logger");
const queues_2 = require("../config/queues");
exports.authController = {
    register: (0, errorHandler_1.asyncHandler)(async (req, res) => {
        const { email, password, name, role, schoolId, teachingLevel, subjects, state, city, phone } = req.body;
        const existingUser = await user_service_1.userService.findByEmail(email);
        if (existingUser) {
            throw new errorHandler_2.AppError('User already exists with this email', 409);
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        const user = await auth_service_1.authService.createUserWithProfile({
            email,
            password: hashedPassword,
            name,
            role,
            schoolId,
            teachingLevel,
            subjects,
            state,
            city,
            phone,
        });
        const tokens = (0, jwt_1.generateTokens)(user);
        const verificationToken = (0, jwt_1.generateEmailVerificationToken)(email);
        if (queues_1.emailQueue) {
            await queues_1.emailQueue.add('send-email', {
                to: email,
                subject: 'Verify your TEACH account',
                template: 'email-verification',
                data: {
                    name,
                    verificationUrl: `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`,
                },
            });
        }
        else {
            logger_1.logger.info(`Email verification would be sent to ${email} (email queue disabled)`);
        }
        if (queues_2.analyticsQueue) {
            await queues_2.analyticsQueue.add('track-event', {
                event: 'user_registered',
                userId: user.id,
                data: { teachingLevel, state, city },
            });
        }
        else {
            logger_1.logger.info(`Registration tracked for user ${user.id} (analytics queue disabled)`);
        }
        logger_1.logger.info(`New user registered: ${email}`);
        res.status(201).json({
            message: 'Registration successful. Please check your email to verify your account.',
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                profile: user.profile,
            },
            tokens,
        });
    }),
    login: (0, errorHandler_1.asyncHandler)(async (req, res) => {
        const { email, password } = req.body;
        const user = await user_service_1.userService.findByEmailWithProfile(email);
        if (!user) {
            throw new errorHandler_2.AppError('Invalid credentials', 401);
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new errorHandler_2.AppError('Invalid credentials', 401);
        }
        if (!user.isEmailVerified && queues_1.emailQueue) {
            throw new errorHandler_2.AppError('Please verify your email before logging in', 403);
        }
        await user_service_1.userService.updateLastLogin(user.id);
        const tokens = (0, jwt_1.generateTokens)(user);
        if (queues_2.analyticsQueue) {
            await queues_2.analyticsQueue.add('track-event', {
                event: 'user_login',
                userId: user.id,
                data: { method: 'email' },
            });
        }
        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                profile: user.profile,
            },
            tokens,
        });
    }),
    refreshToken: (0, errorHandler_1.asyncHandler)(async (req, res) => {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            throw new errorHandler_2.AppError('Refresh token is required', 400);
        }
        try {
            const decoded = (0, jwt_1.verifyToken)(refreshToken);
            const user = await user_service_1.userService.findById(decoded.id);
            if (!user) {
                throw new errorHandler_2.AppError('User not found', 404);
            }
            const tokens = (0, jwt_1.generateTokens)(user);
            res.json({ tokens });
        }
        catch (error) {
            throw new errorHandler_2.AppError('Invalid refresh token', 401);
        }
    }),
    verifyEmail: (0, errorHandler_1.asyncHandler)(async (req, res) => {
        const { token } = req.params;
        const { email } = (0, jwt_1.verifyEmailToken)(token);
        const user = await user_service_1.userService.findByEmail(email);
        if (!user) {
            throw new errorHandler_2.AppError('User not found', 404);
        }
        if (user.isEmailVerified) {
            return res.json({ message: 'Email already verified' });
        }
        await user_service_1.userService.verifyEmail(user.id);
        if (queues_1.emailQueue) {
            await queues_1.emailQueue.add('send-email', {
                to: email,
                subject: 'Welcome to TEACH!',
                template: 'welcome',
                data: {
                    name: user.profile?.name || 'Teacher',
                },
            });
        }
        res.json({ message: 'Email verified successfully' });
    }),
    forgotPassword: (0, errorHandler_1.asyncHandler)(async (req, res) => {
        const { email } = req.body;
        const user = await user_service_1.userService.findByEmailWithProfile(email);
        if (!user) {
            return res.json({
                message: 'If an account exists with this email, you will receive password reset instructions.'
            });
        }
        const resetToken = (0, jwt_1.generatePasswordResetToken)(user.id, email);
        if (queues_1.emailQueue) {
            await queues_1.emailQueue.add('send-email', {
                to: email,
                subject: 'Reset your TEACH password',
                template: 'password-reset',
                data: {
                    name: user.profile?.name || 'Teacher',
                    resetUrl: `${process.env.FRONTEND_URL}/reset-password/${resetToken}`,
                },
            });
        }
        res.json({
            message: 'If an account exists with this email, you will receive password reset instructions.'
        });
    }),
    resetPassword: (0, errorHandler_1.asyncHandler)(async (req, res) => {
        const { token, password } = req.body;
        const { userId } = (0, jwt_1.verifyPasswordResetToken)(token);
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        await user_service_1.userService.updatePassword(userId, hashedPassword);
        if (queues_2.analyticsQueue) {
            await queues_2.analyticsQueue.add('track-event', {
                event: 'password_reset',
                userId,
                data: {},
            });
        }
        res.json({ message: 'Password reset successful' });
    }),
    changePassword: (0, errorHandler_1.asyncHandler)(async (req, res) => {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;
        const user = await user_service_1.userService.findById(userId);
        if (!user) {
            throw new errorHandler_2.AppError('User not found', 404);
        }
        const isPasswordValid = await bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            throw new errorHandler_2.AppError('Current password is incorrect', 401);
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 12);
        await user_service_1.userService.updatePassword(userId, hashedPassword);
        res.json({ message: 'Password changed successfully' });
    }),
    logout: (0, errorHandler_1.asyncHandler)(async (req, res) => {
        if (queues_2.analyticsQueue) {
            await queues_2.analyticsQueue.add('track-event', {
                event: 'user_logout',
                userId: req.user.id,
                data: {},
            });
        }
        res.json({ message: 'Logged out successfully' });
    }),
    getCurrentUser: (0, errorHandler_1.asyncHandler)(async (req, res) => {
        const user = await user_service_1.userService.findByIdWithDetails(req.user.id);
        if (!user) {
            throw new errorHandler_2.AppError('User not found', 404);
        }
        res.json({
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
                profile: user.profile,
                subscription: user.subscription,
                progress: user.progress,
                badges: user.badges,
            },
        });
    }),
};
//# sourceMappingURL=auth.controller.js.map