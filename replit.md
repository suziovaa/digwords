# Digital Humanities Dictionary

## Overview

This is a modern web application for a digital humanities dictionary, featuring Russian-language terms with English equivalents. The application provides a searchable, filterable database of terminology related to digital humanities, including research methods, tools, concepts, technologies, and data formats. The design draws inspiration from modern language learning platforms like Duolingo, combining vibrant aesthetics with academic utility.

## User Preferences

Preferred communication style: Simple, everyday language.

## Deployment

**Single-Origin Architecture on Render**
- Both frontend (React SPA) and backend (Express API) are deployed to the same Render instance
- Eliminates CORS complexity and CDN caching issues
- Uses relative API paths for same-origin requests
- Production URL: www.digwords.online (via custom domain pointing to Render)

**Deployment Process**
1. Code pushed to GitHub triggers automatic Render deployment
2. Build command: `npm ci --include=dev && npm run build`
   - Builds frontend to `dist/public`
   - Builds backend to `dist/index.js`
3. Start command: `NODE_ENV=production npm start`
   - Express serves both static frontend and API routes
4. Database: Neon PostgreSQL (configured via DATABASE_URL env var)

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, configured with hot module replacement (HMR)
- Wouter for lightweight client-side routing (alternative to React Router)

**UI Component Library**
- Shadcn/ui component system with Radix UI primitives for accessible, headless components
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for variant-based component styling
- Custom design system featuring:
  - Vibrant purple primary color (250 75% 58%) for linguistic creativity
  - Fresh teal secondary color (160 70% 45%) for multilingual harmony
  - Coral accent color (35 95% 60%) for calls-to-action
  - Full dark mode support with automatic theme detection and persistence

**Typography**
- Google Fonts integration: Outfit (display), Inter (body with Cyrillic support), JetBrains Mono (monospace)
- Responsive typography hierarchy from hero titles to micro-copy

**State Management**
- TanStack Query (React Query) for server state management, caching, and data fetching
- React Context API for theme management (light/dark mode)
- Local component state with React hooks

**Key Features**
- Alphabet navigation filter for Russian characters (А-Я)
- Section-based filtering with checkboxes
- Real-time search across term names, definitions, and English equivalents
- Responsive design with mobile-first approach using custom breakpoints
- Toast notifications for user feedback

### Backend Architecture

**Runtime & Framework**
- Node.js with Express.js server
- TypeScript for type safety across the entire stack
- ESM (ES Modules) for modern JavaScript module system

**Database Layer**
- PostgreSQL database with Neon serverless implementation
- Drizzle ORM for type-safe database queries and schema management
- Schema-first design with Zod validation through drizzle-zod integration
- WebSocket support for Neon serverless connections

**Database Schema**
The terms table contains:
- `id`: UUID primary key (auto-generated)
- `section`: Text field for categorization (required)
- `term`: The dictionary term in Russian (required)
- `definition`: Full definition text (required)
- `usageExample`: Optional usage example
- `englishEquivalent`: Optional English translation
- `relatedTerms`: Array of related term names
- `source`: Optional bibliographic source

**API Design**
RESTful API endpoints:
- `GET /api/terms` - Retrieve all terms
- `GET /api/terms/:id` - Get single term by ID
- `GET /api/terms/search?q=query` - Search terms
- `POST /api/upload-excel` - Excel file upload for bulk import

**File Upload**
- Multer middleware for handling multipart/form-data
- XLSX library for parsing Excel files
- Memory storage for file processing before database insertion

**Storage Layer**
- Abstraction pattern with IStorage interface for database operations
- DatabaseStorage implementation using Drizzle ORM
- CRUD operations with filtering (ilike for case-insensitive search)
- Batch insert support for Excel imports

### Development & Production Setup

**Development Mode**
- Vite middleware integration with Express for HMR
- Development-only Replit plugins (cartographer, dev-banner, runtime error overlay)
- Request logging with duration tracking for API endpoints
- Error boundary middleware for graceful error handling

**Production Build**
- Client build outputs to `dist/public`
- Server build uses esbuild for bundling to ESM format
- Static file serving in production mode
- Environment variable configuration for database connection

**Type Safety**
- Shared types between client and server via `@shared` module path alias
- Drizzle schema as single source of truth for database types
- Path aliases configured in both tsconfig and Vite for clean imports:
  - `@/` → client/src
  - `@shared/` → shared
  - `@assets/` → attached_assets

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL hosting
  - Connection via `@neondatabase/serverless` package
  - WebSocket-based connection using `ws` library
  - Connection string stored in `DATABASE_URL` environment variable

### Third-Party Services & APIs
- **Google Fonts**: CDN delivery for Architects Daughter, DM Sans, Fira Code, and Geist Mono font families
- **Replit Infrastructure** (development only):
  - Vite plugin for cartographer (code navigation)
  - Vite plugin for dev banner
  - Runtime error modal overlay

### Key NPM Packages

**UI & Styling**
- Radix UI component primitives (30+ component libraries)
- Tailwind CSS with PostCSS and Autoprefixer
- clsx and tailwind-merge for conditional class names
- lucide-react for iconography
- react-day-picker for calendar/date functionality
- cmdk for command palette patterns

**Data & Forms**
- react-hook-form for form state management
- @hookform/resolvers for validation integration
- zod for runtime type validation
- date-fns for date manipulation

**Server & Database**
- drizzle-orm and drizzle-kit for database management
- connect-pg-simple for session storage (imported but not actively used)
- multer for file uploads
- xlsx for Excel file parsing

**Utilities**
- nanoid for generating unique IDs
- @jridgewell/trace-mapping for source map handling