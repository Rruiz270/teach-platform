"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../utils/validation");
const zod_1 = require("zod");
const errorHandler_1 = require("../middleware/errorHandler");
const client_1 = require("@prisma/client");
const logger_1 = require("../utils/logger");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const createEventSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1).max(200),
        description: zod_1.z.string().optional(),
        startDate: zod_1.z.string().datetime(),
        endDate: zod_1.z.string().datetime(),
        type: zod_1.z.enum(['LIVE_CLASS', 'WORKSHOP', 'WEBINAR', 'MENTORING', 'Q_AND_A', 'CONFERENCE']),
        location: zod_1.z.string().optional(),
        meetingUrl: zod_1.z.string().url().optional(),
        maxParticipants: zod_1.z.number().int().positive().optional(),
        instructorId: zod_1.z.string().uuid().optional(),
        moduleId: zod_1.z.string().uuid().optional(),
        lessonId: zod_1.z.string().uuid().optional(),
        tags: zod_1.z.array(zod_1.z.string()).default([]),
        requirements: zod_1.z.string().optional(),
        materials: zod_1.z.array(zod_1.z.string()).default([]),
        isPublished: zod_1.z.boolean().default(false)
    })
});
const updateEventSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1).max(200).optional(),
        description: zod_1.z.string().optional(),
        startDate: zod_1.z.string().datetime().optional(),
        endDate: zod_1.z.string().datetime().optional(),
        type: zod_1.z.enum(['LIVE_CLASS', 'WORKSHOP', 'WEBINAR', 'MENTORING', 'Q_AND_A', 'CONFERENCE']).optional(),
        location: zod_1.z.string().optional(),
        meetingUrl: zod_1.z.string().url().optional(),
        maxParticipants: zod_1.z.number().int().positive().optional(),
        instructorId: zod_1.z.string().uuid().optional(),
        moduleId: zod_1.z.string().uuid().optional(),
        lessonId: zod_1.z.string().uuid().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        requirements: zod_1.z.string().optional(),
        materials: zod_1.z.array(zod_1.z.string()).optional(),
        isPublished: zod_1.z.boolean().optional()
    })
});
const registerEventSchema = zod_1.z.object({
    params: zod_1.z.object({
        eventId: zod_1.z.string().uuid()
    })
});
router.get('/', auth_1.authenticate, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { type, startDate, endDate, instructor, module, published, page = '1', limit = '20' } = req.query;
    const where = {};
    if (type)
        where.type = type;
    if (startDate)
        where.startDate = { gte: new Date(startDate) };
    if (endDate)
        where.endDate = { lte: new Date(endDate) };
    if (instructor)
        where.instructorId = instructor;
    if (module)
        where.moduleId = module;
    if (published !== undefined)
        where.isPublished = published === 'true';
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);
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
                    where: { userId: req.user.id },
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
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        }
    });
}));
router.get('/:id', auth_1.authenticate, (0, errorHandler_1.asyncHandler)(async (req, res) => {
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
}));
router.post('/', auth_1.authenticate, (0, validation_1.validate)(createEventSchema), (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { user } = req;
    if (!['ADMIN', 'AI_MAESTRO', 'SUPER_ADMIN'].includes(user.role)) {
        return res.status(403).json({
            success: false,
            message: 'Insufficient permissions to create events'
        });
    }
    const eventData = {
        ...req.body,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        createdBy: user.id
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
    logger_1.logger.info('Event created', { eventId: event.id, createdBy: user.id });
    res.status(201).json({
        success: true,
        data: event
    });
}));
router.put('/:id', auth_1.authenticate, (0, validation_1.validate)(updateEventSchema), (0, errorHandler_1.asyncHandler)(async (req, res) => {
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
    const canUpdate = user.role === 'SUPER_ADMIN' ||
        user.role === 'ADMIN' ||
        event.createdBy === user.id ||
        event.instructorId === user.id;
    if (!canUpdate) {
        return res.status(403).json({
            success: false,
            message: 'Insufficient permissions to update this event'
        });
    }
    const updateData = { ...req.body };
    if (updateData.startDate)
        updateData.startDate = new Date(updateData.startDate);
    if (updateData.endDate)
        updateData.endDate = new Date(updateData.endDate);
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
}));
router.post('/:eventId/register', auth_1.authenticate, (0, validation_1.validate)(registerEventSchema), (0, errorHandler_1.asyncHandler)(async (req, res) => {
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
    if (event.maxParticipants && event._count.registrations >= event.maxParticipants) {
        return res.status(400).json({
            success: false,
            message: 'Event is full'
        });
    }
    const existingRegistration = await prisma.eventRegistration.findUnique({
        where: {
            userId_eventId: {
                userId: user.id,
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
            userId: user.id,
            eventId,
            status: 'CONFIRMED'
        }
    });
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
}));
router.delete('/:eventId/register', auth_1.authenticate, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { eventId } = req.params;
    const { user } = req;
    const registration = await prisma.eventRegistration.findUnique({
        where: {
            userId_eventId: {
                userId: user.id,
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
}));
router.get('/my/registrations', auth_1.authenticate, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { user } = req;
    const { status, upcoming } = req.query;
    const where = {
        userId: user.id
    };
    if (status)
        where.status = status;
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
        filteredRegistrations = registrations.filter(reg => new Date(reg.event.startDate) > now);
    }
    res.json({
        success: true,
        data: filteredRegistrations
    });
}));
exports.default = router;
//# sourceMappingURL=events.routes.js.map