# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on port 5173
- `npm run build` - Build production version 
- `npm run preview` - Preview production build
- `npm run check` - Type check with svelte-check
- `npm run lint` - Run Prettier and ESLint checks
- `npm run format` - Format code with Prettier

## Architecture

This is a SvelteKit application with Auth0 authentication, built for deployment on Cloudflare Workers.

### Key Structure
- **src/lib/services/** - Core services for authentication and settings
  - `auth0.service.ts` - Auth0 integration with stores and route guards
  - `settings.service.ts` - User settings with localStorage persistence
- **src/lib/components/** - Reusable Svelte components
- **src/routes/(auth)/** - Protected routes requiring authentication
- **src/routes/+page.svelte** - Public landing page

### Authentication Flow
- Uses Auth0 SPA SDK with refresh tokens and localStorage caching
- Route protection via `auth0Guard()` function in layout files
- Access tokens retrieved via `getAccessToken()` for API calls
- Unauthenticated users redirected to `/login` with return path

### Deployment
- Configured for Cloudflare Workers via `@sveltejs/adapter-cloudflare`
- Custom domains configured in `wrangler.jsonc`
- SSR disabled for auth routes (`ssr = false`, `prerender = false`)

### Chat Implementation
- Chat interface in `src/routes/(auth)/chat/+page.svelte`
- Messages sent to backend at `PUBLIC_BACKEND_HOST/chat` with Bearer token
- Real-time message updates with optimistic UI updates
- Auto-scroll to bottom on new messages

### Environment Variables Required
- `PUBLIC_AUTH_DOMAIN` - Auth0 domain
- `PUBLIC_CLIENT_ID` - Auth0 client ID  
- `PUBLIC_BACKEND_HOST` - Backend API URL
