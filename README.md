# Hono 🔥 Better Auth OpenAPI Starter

A modern TypeScript starter project featuring:

- **Hono** - Fast, lightweight web framework
- **Better Auth** - Type-safe authentication
- **Drizzle ORM** - Type-safe database operations
- **Stoker** - Utilities for Hono and OpenAPI
- **OpenAPI** - Automatic API documentation

## Quick Start

1. **Install dependencies:**

   ```sh
   bun install
   ```

2. **Run development server:**

   ```sh
   bun run dev
   ```

3. **Open your browser:**
   ```
   http://localhost:3000
   ```

## Project Structure

```
src/
├── index.ts          # Application entry point
├── db/               # Database schema & migrations
├── middleware/       # Middleware
├── lib/              # Library (utils, types, etc.)
```

## Environment Setup

Copy `.env.example` to `.env` and configure:

```env
LOG_LEVEL=
CORS_ORIGIN=
DATABASE_URL=
```

## Development

- **Hot reload:** Changes automatically restart the server
- **Type safety:** Full TypeScript support with strict mode
- **API docs:** Auto-generated OpenAPI documentation at `/api-docs` and `/api-betterauth` (Better Auth specific endpoints)

## Stack Details

- **Runtime:** Bun
- **Framework:** Hono v4
- **Database:** Drizzle ORM (PostgreSQL default)
- **Auth:** Better Auth
- **Validation:** Zod
- **Documentation:** OpenAPI/Swagger
