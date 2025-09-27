import { prisma } from '../config/database';
import { cacheGet, cacheSet, cacheDelete } from '../config/redis';

const USER_CACHE_PREFIX = 'user:';
const USER_CACHE_TTL = 3600; // 1 hour

export const userService = {
  findById: async (id: string) => {
    // Check cache first
    const cacheKey = `${USER_CACHE_PREFIX}${id}`;
    const cached = await cacheGet(cacheKey);
    
    if (cached) {
      return cached;
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (user) {
      await cacheSet(cacheKey, user, USER_CACHE_TTL);
    }

    return user;
  },

  findByEmail: async (email: string) => {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  findByEmailWithProfile: async (email: string) => {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    });
  },

  findByIdWithDetails: async (id: string) => {
    return await prisma.user.findUnique({
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

  updateLastLogin: async (id: string) => {
    await cacheDelete(`${USER_CACHE_PREFIX}${id}`);
    
    return await prisma.user.update({
      where: { id },
      data: {
        lastLoginAt: new Date(),
      },
    });
  },

  verifyEmail: async (id: string) => {
    await cacheDelete(`${USER_CACHE_PREFIX}${id}`);
    
    return await prisma.user.update({
      where: { id },
      data: {
        isEmailVerified: true,
        emailVerifiedAt: new Date(),
      },
    });
  },

  updatePassword: async (id: string, password: string) => {
    await cacheDelete(`${USER_CACHE_PREFIX}${id}`);
    
    return await prisma.user.update({
      where: { id },
      data: { password },
    });
  },

  updateProfile: async (id: string, data: any) => {
    await cacheDelete(`${USER_CACHE_PREFIX}${id}`);
    
    return await prisma.profile.update({
      where: { userId: id },
      data,
    });
  },

  getLeaderboard: async (limit: number = 10, teachingLevel?: string, state?: string) => {
    const where: any = {};
    
    if (teachingLevel || state) {
      where.profile = {};
      if (teachingLevel) where.profile.teachingLevel = teachingLevel;
      if (state) where.profile.state = state;
    }

    const topUsers = await prisma.user.findMany({
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

    // Calculate scores
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
        score: totalPoints + (avgProgress * 10), // Combined score
      };
    });

    return leaderboard.sort((a, b) => b.score - a.score);
  },

  getStatistics: async (userId: string) => {
    const user = await prisma.user.findUnique({
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

    if (!user) return null;

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