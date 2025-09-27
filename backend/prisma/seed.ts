import { PrismaClient, TeachingLevel, ModuleType, BadgeCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create badges
  const badges = await Promise.all([
    prisma.badge.upsert({
      where: { name: 'AI Pioneer' },
      update: {},
      create: {
        name: 'AI Pioneer',
        description: 'Welcome to TEACH! You\'ve taken the first step in your AI education journey.',
        iconUrl: '/badges/ai-pioneer.svg',
        category: BadgeCategory.PROGRESS,
        criteria: JSON.stringify({ trigger: 'registration' }),
        points: 10,
      },
    }),
    prisma.badge.upsert({
      where: { name: 'Digital Educator' },
      update: {},
      create: {
        name: 'Digital Educator',
        description: 'Complete your first AI lesson and become a digital educator.',
        iconUrl: '/badges/digital-educator.svg',
        category: BadgeCategory.PROGRESS,
        criteria: JSON.stringify({ trigger: 'first_lesson_completed' }),
        points: 20,
      },
    }),
    prisma.badge.upsert({
      where: { name: 'Innovation Starter' },
      update: {},
      create: {
        name: 'Innovation Starter',
        description: 'Successfully complete the Starter module.',
        iconUrl: '/badges/innovation-starter.svg',
        category: BadgeCategory.PROGRESS,
        criteria: JSON.stringify({ trigger: 'starter_module_completed' }),
        points: 50,
      },
    }),
    prisma.badge.upsert({
      where: { name: 'Subject Specialist' },
      update: {},
      create: {
        name: 'Subject Specialist',
        description: 'Master subject-specific AI tools in the Survivor module.',
        iconUrl: '/badges/subject-specialist.svg',
        category: BadgeCategory.PROGRESS,
        criteria: JSON.stringify({ trigger: 'survivor_module_completed' }),
        points: 75,
      },
    }),
    prisma.badge.upsert({
      where: { name: 'Star Performer' },
      update: {},
      create: {
        name: 'Star Performer',
        description: 'Achieve top 10% performance in your cohort.',
        iconUrl: '/badges/star-performer.svg',
        category: BadgeCategory.ACHIEVEMENT,
        criteria: JSON.stringify({ trigger: 'top_10_percent' }),
        points: 100,
      },
    }),
    prisma.badge.upsert({
      where: { name: 'Community Helper' },
      update: {},
      create: {
        name: 'Community Helper',
        description: 'Help 10 fellow teachers in the community forum.',
        iconUrl: '/badges/community-helper.svg',
        category: BadgeCategory.ACHIEVEMENT,
        criteria: JSON.stringify({ trigger: 'help_10_teachers' }),
        points: 50,
      },
    }),
    prisma.badge.upsert({
      where: { name: 'AI Expert Educator' },
      update: {},
      create: {
        name: 'AI Expert Educator',
        description: 'Complete all modules and become an AI Expert Educator.',
        iconUrl: '/badges/ai-expert.svg',
        category: BadgeCategory.SPECIAL,
        criteria: JSON.stringify({ trigger: 'all_modules_completed' }),
        points: 200,
      },
    }),
  ]);

  console.log('Created badges:', badges.length);

  // Create modules
  const modules = await Promise.all([
    prisma.module.upsert({
      where: { type: ModuleType.STARTER },
      update: {},
      create: {
        type: ModuleType.STARTER,
        title: 'AI Foundation for Educators',
        description: 'Learn the fundamentals of AI and how it will transform education. Master basic AI tools and understand your role as a learning facilitator.',
        duration: 8, // 8 weeks
        order: 1,
        thumbnailUrl: '/modules/starter-thumbnail.jpg',
        isPublished: true,
      },
    }),
    prisma.module.upsert({
      where: { type: ModuleType.SURVIVOR },
      update: {},
      create: {
        type: ModuleType.SURVIVOR,
        title: 'Subject-Specific AI Mastery',
        description: 'Discover and master AI tools specific to your teaching subjects and age groups. Create engaging content and enhance student learning.',
        duration: 8, // 8 weeks
        order: 2,
        thumbnailUrl: '/modules/survivor-thumbnail.jpg',
        isPublished: true,
      },
    }),
    prisma.module.upsert({
      where: { type: ModuleType.EXPLORER },
      update: {},
      create: {
        type: ModuleType.EXPLORER,
        title: 'Advanced AI Applications',
        description: 'Explore automation, advanced AI platforms, and community building. Learn to create personalized learning experiences.',
        duration: 8, // 8 weeks
        order: 3,
        thumbnailUrl: '/modules/explorer-thumbnail.jpg',
        isPublished: true,
      },
    }),
    prisma.module.upsert({
      where: { type: ModuleType.EXPERT },
      update: {},
      create: {
        type: ModuleType.EXPERT,
        title: 'AI Leadership & Innovation',
        description: 'Build educational apps, design AI-enhanced curricula, and become a leader in educational transformation.',
        duration: 12, // 12 weeks
        order: 4,
        thumbnailUrl: '/modules/expert-thumbnail.jpg',
        isPublished: true,
      },
    }),
  ]);

  console.log('Created modules:', modules.length);

  // Create sample lessons for Starter module
  const starterModule = modules[0];
  const lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        moduleId: starterModule.id,
        title: 'Introduction to AI in Education',
        description: 'Understand what AI is and how it will revolutionize education in Brazil.',
        content: '# Welcome to the AI Revolution\n\nArtificial Intelligence is transforming every aspect of our lives, and education is no exception...',
        videoUrl: 'https://example.com/video1.mp4',
        duration: 25,
        order: 1,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        moduleId: starterModule.id,
        title: 'Your New Role as a Learning Facilitator',
        description: 'Discover how your role will evolve from traditional teacher to AI-enhanced learning facilitator.',
        content: '# The Future of Teaching\n\nAs AI becomes more prevalent in education, your role as an educator is evolving...',
        videoUrl: 'https://example.com/video2.mp4',
        duration: 30,
        order: 2,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        moduleId: starterModule.id,
        title: 'Getting Started with ChatGPT',
        description: 'Learn the basics of ChatGPT and how to use it effectively for educational purposes.',
        content: '# Your First AI Tool: ChatGPT\n\nChatGPT is one of the most powerful and accessible AI tools available today...',
        videoUrl: 'https://example.com/video3.mp4',
        duration: 35,
        order: 3,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        moduleId: starterModule.id,
        title: 'Prompt Engineering Fundamentals',
        description: 'Master the art of writing effective prompts to get the best results from AI tools.',
        content: '# The Art of Prompting\n\nThe quality of your AI results depends heavily on how you communicate with the AI...',
        videoUrl: 'https://example.com/video4.mp4',
        duration: 40,
        order: 4,
        isPublished: true,
      },
    }),
  ]);

  console.log('Created lessons:', lessons.length);

  // Create forum categories
  const forumCategories = await Promise.all([
    prisma.forumCategory.create({
      data: {
        name: 'General Discussion',
        description: 'General discussions about AI in education',
        order: 1,
      },
    }),
    prisma.forumCategory.create({
      data: {
        name: 'Technical Help',
        description: 'Get help with technical issues and AI tools',
        order: 2,
      },
    }),
    prisma.forumCategory.create({
      data: {
        name: 'Best Practices',
        description: 'Share your success stories and best practices',
        order: 3,
      },
    }),
    prisma.forumCategory.create({
      data: {
        name: 'Subject-Specific',
        description: 'Discussions specific to different teaching subjects',
        order: 4,
      },
    }),
  ]);

  console.log('Created forum categories:', forumCategories.length);

  // Create sample schools
  const schools = await Promise.all([
    prisma.school.create({
      data: {
        name: 'Escola Estadual Professor João Silva',
        type: 'PUBLIC',
        address: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        phone: '(11) 1234-5678',
        email: 'contato@escolajoaosilva.edu.br',
        principalName: 'Maria Santos',
      },
    }),
    prisma.school.create({
      data: {
        name: 'Colégio Santa Maria',
        type: 'PRIVATE',
        address: 'Av. Principal, 456',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '20123-456',
        phone: '(21) 2345-6789',
        email: 'secretaria@santamaria.edu.br',
        principalName: 'Carlos Oliveira',
      },
    }),
    prisma.school.create({
      data: {
        name: 'Escola Municipal Dom Pedro',
        type: 'PUBLIC',
        address: 'Praça Central, 789',
        city: 'Belo Horizonte',
        state: 'MG',
        zipCode: '30123-789',
        phone: '(31) 3456-7890',
        email: 'escola@domPedro.mg.gov.br',
        principalName: 'Ana Costa',
      },
    }),
  ]);

  console.log('Created schools:', schools.length);

  // Create admin user
  const bcrypt = require('bcryptjs');
  const adminPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@teach.edu.br' },
    update: {},
    create: {
      email: 'admin@teach.edu.br',
      password: adminPassword,
      role: 'SUPER_ADMIN',
      isEmailVerified: true,
      emailVerifiedAt: new Date(),
      profile: {
        create: {
          name: 'TEACH Administrator',
          teachingLevel: TeachingLevel.HIGH_SCHOOL,
          subjects: ['Administration'],
          state: 'SP',
          city: 'São Paulo',
          bio: 'TEACH Platform Administrator',
        },
      },
      subscription: {
        create: {
          type: 'GOVERNMENT',
          plan: 'PREMIUM',
          endDate: new Date('2030-12-31'),
          isActive: true,
        },
      },
    },
  });

  console.log('Created admin user:', adminUser.email);

  console.log('Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });