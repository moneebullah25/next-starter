# Next.js Base Repository

A modern Next.js starter template with TypeScript, Tailwind CSS, and Docker support.

## Features

- Next.js 15+
- React 19
- TypeScript
- Tailwind CSS
- Fully Dockerized

## Getting Started

This project is fully containerized with Docker. All development and production environments run inside Docker containers.

### Prerequisites

- Docker
- Docker Compose

## Docker Usage

Set up environment variables:
   - Copy `.env.template` to `.env`
   - Update the variables as needed

### Development

Start the development environment:
```bash
docker-compose -f docker-compose.development.yml up
```

You can modify the port within the `.env` file.

### Production

Start the production environment:
```bash
docker-compose -f docker-compose.production.yml up
```

## Project Structure

- `/app` - Next.js app directory
- `/components` - React components
- `/context` - React context providers
- `/css` - CSS files including Tailwind
- `/hooks` - Custom React hooks
- `/types` - TypeScript type definitions
- `/utils` - Utility functions

## License

MIT
