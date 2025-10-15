# TEACH Platform - Technology Education for Advanced Classroom Help

Revolutionary AI education platform for Brazilian teachers.

## 🚀 Project Overview

TEACH is designed to train Brazil's 2.3 million teachers in AI tools and methodologies, transforming them into AI-empowered educators and learning facilitators.

### Key Features
- 4-level progressive curriculum (Starter → Survivor → Explorer → Expert)
- 30+ AI tools integration
- Gamification with badges and leaderboards
- Community forums and peer learning
- Parent education program
- Real-time progress tracking

## 🏗️ Architecture

### Backend
- **Framework**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis
- **Authentication**: JWT with bcryptjs
- **File Storage**: AWS S3
- **Queue System**: Bull for background jobs

### Frontend (Coming Soon)
- **Framework**: Next.js 14 with TypeScript
- **UI**: Tailwind CSS + Shadcn/ui
- **State**: Zustand
- **Forms**: React Hook Form + Zod

## 🛠️ Development Setup

### Prerequisites
- Node.js 20+
- Docker and Docker Compose
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd teach-platform
```

### 2. Start Database Services
```bash
docker-compose up -d postgres redis
```

### 3. Backend Setup
```bash
cd backend
npm install
```

### 4. Environment Configuration
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 5. Database Setup
```bash
# Generate Prisma client
npm run generate

# Run migrations
npm run migrate

# Seed database
npm run seed
```

### 6. Start Development Server
```bash
npm run dev
```

The backend will be available at `http://localhost:3001`

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh-token` - Refresh JWT token
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/logout` - Logout user

### User Management
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile
- `GET /api/v1/users/leaderboard` - Get leaderboard
- `GET /api/v1/users/statistics` - Get user statistics

### Learning Management
- `GET /api/v1/modules` - Get available modules
- `GET /api/v1/lessons` - Get lessons
- `GET /api/v1/progress` - Get user progress
- `POST /api/v1/assessments/submit` - Submit assessment

### AI Integration
- `POST /api/v1/ai/chat` - Chat with AI tools

## 🔑 Default Admin Account

After seeding, use these credentials:
- **Email**: admin@teach.edu.br
- **Password**: admin123

## 📊 Database Schema

### Core Entities
- **Users**: Teacher accounts with profiles
- **Schools**: Educational institutions
- **Modules**: Learning modules (Starter, Survivor, Explorer, Expert)
- **Lessons**: Individual lessons within modules
- **Assessments**: Quizzes and practical projects
- **Badges**: Gamification achievements
- **Forums**: Community discussions

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Production Environment Variables
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/teach_db
REDIS_URL=redis://host:6379
JWT_SECRET=your-production-secret
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
```

### Build and Deploy
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📈 Monitoring

- **Logs**: Winston logger with file rotation
- **Health Check**: `GET /health`
- **Metrics**: Built-in endpoint monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Authentication system
- ✅ Database schema
- ✅ Basic API structure
- ⏳ Frontend development
- ⏳ AI tool integrations

### Phase 2
- Community features
- Video streaming
- Assessment engine
- Gamification system

### Phase 3
- Mobile apps
- Advanced analytics
- Payment integration
- Scaling optimizations

## 📞 Contact

For questions or support:
- Email: dev@teach.edu.br
- Documentation: [Coming Soon]

---

**TEACH** - Transforming Brazilian education through AI empowerment 🇧🇷

Last updated: October 15, 2024 - AI endpoints added 
