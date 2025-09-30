"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const database_1 = require("../config/database");
const redis_1 = require("../config/redis");
const USER_CACHE_PREFIX = 'user:';
const USER_CACHE_TTL = 3600;
exports.userService = {
    findById: async (id) => {
        const cacheKey = `${USER_CACHE_PREFIX}${id}`;
        const cached = await (0, redis_1.cacheGet)(cacheKey);
        if (cached) {
            return cached;
        }
        const user = await database_1.prisma.user.findUnique({
            where: { id },
        });
        if (user) {
            await (0, redis_1.cacheSet)(cacheKey, user, USER_CACHE_TTL);
        }
        return user;
    },
    findByEmail: async (email) => {
        return await database_1.prisma.user.findUnique({
            where: { email },
        });
    },
    findByEmailWithProfile: async (email) => {
        return await database_1.prisma.user.findUnique({
            where: { email },
            include: {
                profile: true,
            },
        });
    },
    findByIdWithDetails: async (id) => {
        return await database_1.prisma.user.findUnique({
            where: { id },
            include: {
                profile: {
                    include: {
                        school: true,
                    },
                },
                subscription: true,
                progress: {
                    include: {
                        module: true,
                    },
                },
                badges: {
                    include: {
                        badge: true,
                    },
                },
                notifications: {
                    where: { isRead: false },
                    take: 10,
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
    },
    updateLastLogin: async (id) => {
        await (0, redis_1.cacheDelete)(`${USER_CACHE_PREFIX}${id}`);
        return await database_1.prisma.user.update({
            where: { id },
            data: {
                lastLoginAt: new Date(),
            },
        });
    },
    verifyEmail: async (id) => {
        await (0, redis_1.cacheDelete)(`${USER_CACHE_PREFIX}${id}`);
        return await database_1.prisma.user.update({
            where: { id },
            data: {
                isEmailVerified: true,
                emailVerifiedAt: new Date(),
            },
        });
    },
    updatePassword: async (id, password) => {
        await (0, redis_1.cacheDelete)(`${USER_CACHE_PREFIX}${id}`);
        return await database_1.prisma.user.update({
            where: { id },
            data: { password },
        });
    },
    updateProfile: async (id, data) => {
        await (0, redis_1.cacheDelete)(`${USER_CACHE_PREFIX}${id}`);
        return await database_1.prisma.profile.update({
            where: { userId: id },
            data,
        });
    },
    getLeaderboard: async (limit = 10, teachingLevel, state) => {
        const where = {};
        if (teachingLevel || state) {
            where.profile = {};
            if (teachingLevel)
                where.profile.teachingLevel = teachingLevel;
            if (state)
                where.profile.state = state;
        }
        const topUsers = await database_1.prisma.user.findMany({
            where,
            select: {
                id: true,
                profile: {
                    select: {
                        name: true,
                        state: true,
                        city: true,
                        photoUrl: true,
                    },
                },
                badges: {
                    select: {
                        badge: {
                            select: {
                                points: true,
                            },
                        },
                    },
                },
                progress: {
                    select: {
                        progressPercent: true,
                    },
                },
            },
            take: limit,
        });
        const leaderboard = topUsers.map(user => {
            const totalPoints = user.badges.reduce((sum, ub) => sum + ub.badge.points, 0);
            const avgProgress = user.progress.length > 0
                ? user.progress.reduce((sum, p) => sum + p.progressPercent, 0) / user.progress.length
                : 0;
            return {
                userId: user.id,
                name: user.profile?.name || 'Anonymous',
                state: user.profile?.state,
                city: user.profile?.city,
                photoUrl: user.profile?.photoUrl,
                totalPoints,
                avgProgress,
                score: totalPoints + (avgProgress * 10),
            };
        });
        return leaderboard.sort((a, b) => b.score - a.score);
    },
    getStatistics: async (userId) => {
        const user = await database_1.prisma.user.findUnique({
            where: { id: userId },
            include: {
                badges: true,
                progress: {
                    include: {
                        module: true,
                    },
                },
                assessmentResults: {
                    where: { isPassed: true },
                },
                projectSubmissions: {
                    where: { grade: { gte: 70 } },
                },
                forumPosts: true,
                forumComments: true,
            },
        });
        if (!user)
            return null;
        return {
            totalBadges: user.badges.length,
            modulesCompleted: user.progress.filter(p => p.completedAt !== null).length,
            assessmentsPassed: user.assessmentResults.length,
            projectsSubmitted: user.projectSubmissions.length,
            forumContributions: user.forumPosts.length + user.forumComments.length,
            averageProgress: user.progress.length > 0
                ? user.progress.reduce((sum, p) => sum + p.progressPercent, 0) / user.progress.length
                : 0,
        };
    },
};
//# sourceMappingURL=user.service.js.map