# AI Chat Frontend

A modern web-based chat application that provides an intuitive interface for conversing with AI assistants. Built with SvelteKit and deployed on Cloudflare Workers.

## What This Project Does

This application serves as the frontend interface for an AI chat service, enabling users to:

- **Authenticate securely** via Auth0 integration
- **Chat with AI assistants** through a real-time messaging interface
- **Customize system prompts** and conversation settings
- **Manage chat sessions** with the ability to start fresh conversations
- **Access conversations** from any device with responsive design

## Key Features

### 🔐 Authentication
- Secure Auth0 integration with JWT token management
- Protected routes with automatic redirect to login
- Session persistence with refresh token support

### 💬 Chat Interface
- Real-time messaging with optimistic UI updates
- Auto-scroll to keep latest messages visible
- Clean, responsive design optimized for conversations
- Session management with new chat capabilities

### ⚙️ User Settings
- Customizable system prompts for AI behavior
- Persistent settings stored locally
- User preference management

### 🚀 Modern Architecture
- SvelteKit full-stack framework with TypeScript
- Cloudflare Workers deployment for global performance
- Tailwind CSS for responsive, modern styling
- SSR disabled for optimized client-side authentication

## Tech Stack

- **Frontend**: SvelteKit + TypeScript
- **Authentication**: Auth0 SPA SDK
- **Styling**: Tailwind CSS
- **Deployment**: Cloudflare Workers
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Environment Variables
Create a `.env` file with:
```
PUBLIC_AUTH_DOMAIN=your-auth0-domain
PUBLIC_CLIENT_ID=your-auth0-client-id
PUBLIC_BACKEND_HOST=your-backend-api-url
```

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build & Deploy
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Cloudflare Workers
npm run deploy
```

## Available Scripts

- `npm run dev` - Start development server on port 5173
- `npm run build` - Build production version
- `npm run preview` - Preview production build
- `npm run check` - Type check with svelte-check
- `npm run lint` - Run Prettier and ESLint checks
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable Svelte components
│   └── services/       # Core services (auth, settings)
├── routes/
│   ├── (auth)/        # Protected routes requiring authentication
│   │   ├── chat/      # Main chat interface
│   │   └── settings/  # User settings page
│   └── +page.svelte   # Public landing page
└── app.html           # Main HTML template
```

## Architecture Notes

- **Frontend-only application** that communicates with a separate backend API
- **Route protection** ensures authentication for sensitive areas
- **Optimistic UI** provides smooth user experience during message sending
- **Local storage** used for settings persistence and auth token caching
