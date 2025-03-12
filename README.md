# Next.js Base Repository

A modern Next.js starter template with TypeScript, Tailwind CSS, and Docker support.

## Features

- Next.js 15+
- React 19
- TypeScript
- Tailwind CSS
- Fully Dockerized
- Prettier code formatting

## Getting Started

This project is fully containerized with Docker. All development and production environments run inside Docker containers.

### Prerequisites

- Docker
- Docker Compose

## Docker Usage & Debugging

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

### VS Code Integration

This project includes VS Code launch configurations for Docker containers:

1. Open the project in VS Code
2. Navigate to the Run and Debug panel (Ctrl+Shift+D or Cmd+Shift+D)
3. Select either "Docker Compose (Development)" or "Docker Compose (Production)" from the dropdown
4. Press the play button or F5 to start the containers

The launch configurations will build and start the Docker containers in the appropriate mode. Remember to stop the debug session when you are done.

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
