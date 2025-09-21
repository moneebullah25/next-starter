# Docker Setup Guide

This project includes optimized Docker configurations for both development and production environments using multi-stage builds following best practices.

## 🏗️ Architecture

### Multi-Stage Dockerfile
- **Base Stage**: Common setup for pnpm and package files
- **Dependencies Stage**: Installs all dependencies (dev + prod)
- **Builder Stage**: Builds the Next.js application
- **Production Dependencies Stage**: Installs only production dependencies
- **Production Stage**: Optimized runtime with security features
- **Development Stage**: Development environment with hot reload

### Security Features
- Non-root user execution
- Security options (no-new-privileges)
- Resource limits
- Health checks

## 🚀 Quick Start

### Development Environment
```bash
# Build and start development environment
npm run docker:dev

# Or manually
docker compose --env-file ./.env.dev -f docker-compose.dev.yml up
```

### Production Environment
```bash
# Build and start production environment
npm run docker:prod

# Or manually
docker compose --env-file ./.env.prod -f docker-compose.prod.yml up -d
```

## 📋 Available Commands

### Development
- `npm run docker:dev` - Start development environment
- `npm run docker:dev:build` - Build development image
- `npm run docker:dev:down` - Stop development environment

### Production
- `npm run docker:prod` - Start production environment
- `npm run docker:prod:build` - Build production image
- `npm run docker:prod:down` - Stop production environment

### Maintenance
- `npm run docker:clean` - Clean up Docker system and volumes

## 🔧 Environment Configuration

### Development (.env.dev)
```env
NODE_ENV=development
NEXTJS_EXTERNAL_PORT=3000
NEXTJS_INTERNAL_PORT=3000
```

### Production (.env.prod)
```env
NODE_ENV=production
NEXTJS_EXTERNAL_PORT=3000
NEXTJS_INTERNAL_PORT=3000
```

## 🏭 Production Features

### Optimizations
- Multi-stage build for smaller image size
- Production-only dependencies
- Non-root user execution
- Health checks
- Resource limits
- Security hardening

### Health Check
The production container includes a health check endpoint at `/api/health` that returns:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

## 🛠️ Development Features

### Hot Reload
- Volume mounting for live code changes
- Watchpack polling for file system events
- Interactive terminal support

### Volume Mounts
- Source code: `.:/app`
- Node modules: `/app/node_modules` (anonymous volume)
- Next.js cache: `/app/.next` (anonymous volume)

## 📁 File Structure

```
├── Dockerfile                 # Multi-stage production Dockerfile
├── Dockerfile.dev            # Development Dockerfile
├── docker-compose.prod.yml   # Production compose file
├── docker-compose.dev.yml    # Development compose file
├── .dockerignore             # Docker ignore file
├── .env.prod                 # Production environment variables
├── .env.dev                  # Development environment variables
└── app/api/health/route.ts   # Health check endpoint
```

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Change port in environment file
   NEXTJS_EXTERNAL_PORT=3001
   ```

2. **Permission issues on Linux/Mac**
   ```bash
   # Fix ownership
   sudo chown -R $USER:$USER .
   ```

3. **Build cache issues**
   ```bash
   # Clean build
   docker compose build --no-cache
   ```

4. **Clean up everything**
   ```bash
   npm run docker:clean
   ```

### Debugging

1. **Check container logs**
   ```bash
   docker compose logs nextjs
   ```

2. **Access container shell**
   ```bash
   docker compose exec nextjs sh
   ```

3. **Check health status**
   ```bash
   curl http://localhost:3000/api/health
   ```

## 🚀 Deployment

### Production Deployment
1. Set up your production environment variables in `.env.prod`
2. Build the production image: `npm run docker:prod:build`
3. Start the production environment: `npm run docker:prod`

### CI/CD Integration
The Docker setup is ready for CI/CD pipelines with:
- Multi-stage builds for efficient caching
- Health checks for deployment validation
- Security best practices
- Resource limits for predictable performance

## 📊 Performance

### Image Sizes
- **Production**: ~150MB (optimized with production dependencies only)
- **Development**: ~300MB (includes dev dependencies and tools)

### Build Times
- **First build**: ~2-3 minutes
- **Subsequent builds**: ~30-60 seconds (with Docker layer caching)

## 🔒 Security

- Non-root user execution
- No new privileges
- Resource limits
- Health monitoring
- Minimal attack surface
- Regular base image updates
