import { prisma } from '../config/database';
import { Prisma, TeachingLevel } from '@prisma/client';
import { logger } from '../utils/logger';

interface CreateUserData {
  email: string;
  password: string;
  name: string;
  role?: string;
  schoolId?: string;
  teachingLevel: TeachingLevel;
  subjects: string[];
  state: string;
  city: string;
  phone?: string;
}

export const authService = {
  createUserWithProfile: async (data: CreateUserData) => {
    const { email, password, name, role, schoolId, teachingLevel, subjects, state, city, phone } = data;

    try {
      const user = await prisma.$transaction(async (tx) => {
        // Create user
        const newUser = await tx.user.create({
          data: {
            email,
            password,
            ...(role && { role: role as any }),
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
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days free trial
              },
            },
          },
          include: {
            profile: true,
            subscription: true,
          },
        });

        // TODO: Enable when Notification table exists
        // await tx.notification.create({
        //   data: {
        //     userId: newUser.id,
        //     title: 'Welcome to TEACH!',
        //     message: 'Start your AI education journey by exploring the Starter module.',
        //     type: 'WELCOME',
        //   },
        // });

        // TODO: Enable when Badge tables exist
        // const welcomeBadge = await tx.badge.findFirst({
        //   where: { name: 'AI Pioneer' },
        // });

        // if (welcomeBadge) {
        //   await tx.userBadge.create({
        //     data: {
        //       userId: newUser.id,
        //       badgeId: welcomeBadge.id,
        //     },
        //   });

        //   await tx.notification.create({
        //     data: {
        //       userId: newUser.id,
        //       title: 'Badge Earned!',
        //       message: 'You earned the AI Pioneer badge for joining TEACH!',
        //       type: 'BADGE_EARNED',
        //       data: { badgeId: welcomeBadge.id, badgeName: welcomeBadge.name },
        //     },
        //   });
        // }

        logger.info(`User created successfully: ${email}`);
        return newUser;
      });

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          logger.error(`Duplicate email attempt: ${email}`);
          throw new Error('Email already exists');
        }
      }
      logger.error('Error creating user:', error);
      throw error;
    }
  },
};