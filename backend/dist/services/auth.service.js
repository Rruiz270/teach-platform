"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const database_1 = require("../config/database");
const client_1 = require("@prisma/client");
const logger_1 = require("../utils/logger");
exports.authService = {
    createUserWithProfile: async (data) => {
        const { email, password, name, role, schoolId, teachingLevel, subjects, state, city, phone } = data;
        try {
            const user = await database_1.prisma.$transaction(async (tx) => {
                const newUser = await tx.user.create({
                    data: {
                        email,
                        password,
                        ...(role && { role: role }),
                        profile: {
                            create: {
                                name,
                                schoolId,
                                teachingLevel,
                                subjects,
                                state,
                                city,
                                phone,
                            },
                        },
                        subscription: {
                            create: {
                                type: 'FREE',
                                plan: 'STARTER',
                                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                            },
                        },
                    },
                    include: {
                        profile: true,
                        subscription: true,
                    },
                });
                logger_1.logger.info(`User created successfully: ${email}`);
                return newUser;
            });
            return user;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    logger_1.logger.error(`Duplicate email attempt: ${email}`);
                    throw new Error('Email already exists');
                }
            }
            logger_1.logger.error('Error creating user:', error);
            throw error;
        }
    },
};
//# sourceMappingURL=auth.service.js.map