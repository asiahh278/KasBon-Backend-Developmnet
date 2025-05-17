# KasBon Backend Setup Guide

This document provides detailed instructions for setting up and running the KasBon Backend application.

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js (if running locally)
- PostgreSQL (if running locally)
- Git

## 🛠️ Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/asiahh278/KasBon-Backend-Developmnet.git
cd kasbon_banckend_app
```

2. Create a `.env` file in the root directory with the following variables:
```env
DB_HOST=postgres
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=kasbon_db
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

3. Start the application using Docker:
```bash
docker-compose up -d
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Debt Management
- `POST /api/debts` - Create new debt
- `GET /api/debts` - Get user debts
- `POST /api/debts/:id/confirm` - Confirm payment

### Admin Routes
- `GET /api/admin/debts` - Get all debts
- `POST /api/admin/debts/:id/approve` - Approve debt
- `POST /api/admin/debts/:id/reject` - Reject debt
- `POST /api/admin/debts/:id/verify` - Verify payment

## 📦 Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild services
docker-compose up -d --build

# Access database
docker-compose exec postgres psql -U postgres -d kasbon_db
```

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DB_HOST | Database host | postgres |
| DB_USER | Database user | postgres |
| DB_PASSWORD | Database password | postgres |
| DB_NAME | Database name | kasbon_db |
| DB_PORT | Database port | 5432 |
| JWT_SECRET | JWT secret key | - |
| PORT | Application port | 3000 |

## 🔍 Troubleshooting

1. **Database Connection Issues**
   - Ensure PostgreSQL is running
   - Check environment variables
   - Verify network connectivity

2. **Docker Issues**
   - Check Docker daemon status
   - Verify port availability
   - Check container logs

3. **Application Issues**
   - Check application logs
   - Verify JWT secret
   - Check API endpoint accessibility 