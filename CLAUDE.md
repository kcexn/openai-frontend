# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development:**

```bash
npm run dev          # Start development server on localhost:5173
npm run build        # Build for production
npm run preview      # Preview production build locally
```

**Code Quality:**

```bash
npm run check        # Run TypeScript checking with svelte-check
npm run check:watch  # Watch mode for TypeScript checking
npm run lint         # Run ESLint and Prettier checks
npm run format       # Format all files with Prettier
```

## Architecture Overview

This is a **SvelteKit frontend application** serving as an AI chat interface with Auth0 authentication.

**Tech Stack:**

- SvelteKit 2.x with Svelte 5 (modern syntax with snippets)
- TypeScript with strict mode
- Tailwind CSS with typography plugin
- Auth0 SPA SDK for authentication
- Cloudflare Pages/Workers deployment

**Key Architecture Patterns:**

**Authentication Flow:**

- Auth0 redirect-based authentication handled in `src/routes/+layout.svelte`
- Authentication state managed via Svelte stores in `src/lib/services/auth0.service.ts`
- Server-side route protection in `src/hooks.server.ts`
- Protected routes check authentication in `+page.server.ts` files

**Component Structure:**

- Reusable components in `src/lib/components/` with barrel exports
- Icon system using SVG components in `src/lib/components/icons/`
- Modern Svelte 5 patterns including snippets for flexible rendering

**Routing:**

- File-based routing with SvelteKit conventions
- Server-side authentication checks for protected routes (`/chat`, `/settings`)
- Layout inheritance with `+layout.svelte` handling auth initialization

**State Management:**

- Svelte stores for authentication state
- Props-based component communication
- Server-side data loading for authenticated routes

## Important Implementation Details

**Authentication:**

- Auth0 client initialized in root layout with domain/clientId from environment
- Authentication errors redirect to login via `goto('/')`
- Token management handled automatically by Auth0 SPA SDK

**Styling:**

- Tailwind utility classes with PostCSS processing
- Component styles using `<style lang="postcss">`
- Responsive design patterns throughout

**Type Safety:**

- TypeScript strict mode enabled
- SvelteKit types auto-generated via `svelte-kit sync`
- Component props strongly typed

## Development Workflow

1. Always run `npm run check` before committing to ensure TypeScript compliance
2. Use `npm run lint` to verify code style and formatting
3. Authentication testing requires Auth0 configuration in environment variables
4. Protected routes will redirect to login if user is not authenticated

## Deployment

Configured for Cloudflare Pages with Workers adapter. Build artifacts optimized for Cloudflare's edge runtime.
