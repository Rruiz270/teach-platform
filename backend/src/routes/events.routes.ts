import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { validate } from '../utils/validation';
import { z } from 'zod';
import { asyncHandler } from '../middleware/errorHandler';
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

const router = Router();
const prisma = new PrismaClient();

// Validation schemas
const createEventSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200),
    description: z.string().optional(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    type: z.enum(['LIVE_CLASS', 'WORKSHOP', 'WEBINAR', 'MENTORING', 'Q_AND_A', 'CONFERENCE']),
    location: z.string().optional(),
    meetingUrl: z.string().url().optional(),
    maxParticipants: z.number().int().positive().optional(),
    instructorId: z.string().uuid().optional(),
    moduleId: z.string().uuid().optional(),
    lessonId: z.string().uuid().optional(),
    tags: z.array(z.string()).default([]),
    requirements: z.string().optional(),
    materials: z.array(z.string()).default([]),
    isPublished: z.boolean().default(false)
  })
});

const updateEventSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    type: z.enum(['LIVE_CLASS', 'WORKSHOP', 'WEBINAR', 'MENTORING', 'Q_AND_A', 'CONFERENCE']).optional(),
    location: z.string().optional(),
    meetingUrl: z.string().url().optional(),
    maxParticipants: z.number().int().positive().optional(),
    instructorId: z.string().uuid().optional(),
    moduleId: z.string().uuid().optional(),
    lessonId: z.string().uuid().optional(),
    tags: z.array(z.string()).optional(),
    requirements: z.string().optional(),
    materials: z.array(z.string()).optional(),
    isPublished: z.boolean().optional()
  })
});

const registerEventSchema = z.object({
  params: z.object({
    eventId: z.string().uuid()
  })
});

// Get all events (with filters)
router.get(
  '/',
  authenticate,
  asyncHandler(async (req, res) => {
    const { 
      type, 
      startDate, 
      endDate, 
      instructor, 
      module, 
      published,
      page = '1',
      limit = '20'
    } = req.query;

    const where: any = {};
    
    if (type) where.type = type;
    if (startDate) where.startDate = { gte: new Date(startDate as string) };
    if (endDate) where.endDate = { lte: new Date(endDate as string) };
    if (instructor) where.instructorId = instructor;
    if (module) where.moduleId = module;
    if (published !== undefined) where.isPublished = published === 'true';

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        include: {
          instructor: {
            select: {
              id: true,
              profile: {
                select: { name: true, photoUrl: true }
              }
            }
          },
          module: {
            select: { id: true, title: true, type: true }
          },
          lesson: {
            select: { id: true, title: true }
          },
          registrations: {
            where: { userId: req.user!.id },
            select: { id: true, status: true, registeredAt: true }
          },
          _count: {
            select: { registrations: true }
          }
        },
        orderBy: { startDate: 'asc' },
        skip,
        take
      }),
      prisma.event.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        events,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total,
          pages: Math.ceil(total / parseInt(limit as string))
        }
      }
    });
  })
);

// Get event by ID
router.get(
  '/:id',
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            profile: {
              select: { name: true, photoUrl: true }
            }
          }
        },
        instructor: {
          select: {
            id: true,
            profile: {
              select: { name: true, photoUrl: true, bio: true }
            }
          }
        },
        module: {
          select: { id: true, title: true, type: true, description: true }
        },
        lesson: {
          select: { id: true, title: true, description: true }
        },
        registrations: {
          include: {
            user: {
              select: {
                id: true,
                profile: {
                  select: { name: true, photoUrl: true }
                }
              }
            }
          }
        },
        resources: {
          orderBy: { order: 'asc' }
        },
        _count: {
          select: { registrations: true }
        }
      }
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      data: event
    });
  })
);

// Create new event (Admin/Instructor only)
router.post(
  '/',
  authenticate,
  validate(createEventSchema),
  asyncHandler(async (req, res) => {
    const { user } = req;
    
    // Check if user can create events (Admin, AI_MAESTRO, or SUPER_ADMIN)
    if (!['ADMIN', 'AI_MAESTRO', 'SUPER_ADMIN'].includes(user!.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions to create events'
      });
    }

    const eventData = {
      ...req.body,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      createdBy: user!.id
    };

    const event = await prisma.event.create({
      data: eventData,
      include: {
        instructor: {
          select: {
            id: true,
            profile: {
              select: { name: true, photoUrl: true }
            }
          }
        },
        module: {
          select: { id: true, title: true, type: true }
        }
      }
    });

    logger.info('Event created', { eventId: event.id, createdBy: user!.id });

    res.status(201).json({
      success: true,
      data: event
    });
  })
);

// Update event
router.put(
  '/:id',
  authenticate,
  validate(updateEventSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { user } = req;

    const event = await prisma.event.findUnique({
      where: { id }
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if user can update this event
    const canUpdate = user!.role === 'SUPER_ADMIN' || 
                     user!.role === 'ADMIN' ||
                     event.createdBy === user!.id ||
                     event.instructorId === user!.id;

    if (!canUpdate) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions to update this event'
      });
    }

    const updateData = { ...req.body };
    if (updateData.startDate) updateData.startDate = new Date(updateData.startDate);
    if (updateData.endDate) updateData.endDate = new Date(updateData.endDate);

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: updateData,
      include: {
        instructor: {
          select: {
            id: true,
            profile: {
              select: { name: true, photoUrl: true }
            }
          }
        },
        module: {
          select: { id: true, title: true, type: true }
        }
      }
    });

    res.json({
      success: true,
      data: updatedEvent
    });
  })
);

// Register for event
router.post(
  '/:eventId/register',
  authenticate,
  validate(registerEventSchema),
  asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    const { user } = req;

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        _count: {
          select: { registrations: true }
        }
      }
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (!event.isPublished) {
      return res.status(400).json({
        success: false,
        message: 'Event is not published yet'
      });
    }

    // Check if event is full
    if (event.maxParticipants && event._count.registrations >= event.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Event is full'
      });
    }

    // Check if already registered
    const existingRegistration = await prisma.eventRegistration.findUnique({
      where: {
        userId_eventId: {
          userId: user!.id,
          eventId
        }
      }
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'Already registered for this event'
      });
    }

    const registration = await prisma.eventRegistration.create({
      data: {
        userId: user!.id,
        eventId,
        status: 'CONFIRMED'
      }
    });

    // Update participant count
    await prisma.event.update({
      where: { id: eventId },
      data: {
        currentParticipants: {
          increment: 1
        }
      }
    });

    res.status(201).json({
      success: true,
      data: registration
    });
  })
);

// Cancel registration
router.delete(
  '/:eventId/register',
  authenticate,
  asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    const { user } = req;

    const registration = await prisma.eventRegistration.findUnique({
      where: {
        userId_eventId: {
          userId: user!.id,
          eventId
        }
      }
    });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    await prisma.eventRegistration.delete({
      where: { id: registration.id }
    });

    // Update participant count
    await prisma.event.update({
      where: { id: eventId },
      data: {
        currentParticipants: {
          decrement: 1
        }
      }
    });

    res.json({
      success: true,
      message: 'Registration cancelled successfully'
    });
  })
);

// Get user's registered events
router.get(
  '/my/registrations',
  authenticate,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const { status, upcoming } = req.query;

    const where: any = {
      userId: user!.id
    };

    if (status) where.status = status;

    const registrations = await prisma.eventRegistration.findMany({
      where,
      include: {
        event: {
          include: {
            instructor: {
              select: {
                id: true,
                profile: {
                  select: { name: true, photoUrl: true }
                }
              }
            },
            module: {
              select: { id: true, title: true, type: true }
            }
          }
        }
      },
      orderBy: {
        event: {
          startDate: 'asc'
        }
      }
    });

    let filteredRegistrations = registrations;

    if (upcoming === 'true') {
      const now = new Date();
      filteredRegistrations = registrations.filter(
        reg => new Date(reg.event.startDate) > now
      );
    }

    res.json({
      success: true,
      data: filteredRegistrations
    });
  })
);

export default router;