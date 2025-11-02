# Digital Humanities Dictionary

A modern bilingual (Russian-English) online dictionary for digital humanities terms, featuring a stunning teal ocean design with minimalist aesthetics.

## ✨ Features

- 🌊 **Beautiful Design**: Magical teal ocean gradient with smooth transitions and floating animations
- 🔍 **Full-Text Search**: Search across terms, definitions, and English equivalents
- 🔤 **Alphabetical Navigation**: Browse by Russian alphabet (А-Я)
- 📚 **Section Filtering**: Filter terms by category via URL parameters
- 🌐 **Bilingual**: Russian terms with English equivalents
- 📱 **Responsive**: Mobile-first design that works on all devices
- ⚡ **Fast**: Modern tech stack with optimized performance
- 📊 **Excel Import**: Admin interface for bulk uploading terms from Excel files

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for blazing-fast development
- Tailwind CSS + Shadcn/ui for beautiful components
- Framer Motion for smooth animations
- TanStack Query for data management
- Wouter for lightweight routing

**Backend:**
- Node.js with Express
- PostgreSQL database (Neon serverless)
- Drizzle ORM for type-safe database queries
- Multer for file uploads (Excel import)

## 🌐 Live Demo

Visit the live site: [https://www.digwords.online](https://www.digwords.online)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd digital-humanities-dictionary
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_session_secret_here
```

4. Push database schema:
```bash
npm run db:push
```

5. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

## 📦 Building for Production

```bash
npm run build
```

This creates:
- Client build in `dist/public/`
- Server build in `dist/index.js`

To run production build:
```bash
npm start
```

## 📊 Data Import

Upload Excel files through the admin interface at `/admin`:
- Excel file should have columns: `section`, `term`, `definition`, `usageExample`, `englishEquivalent`, `relatedTerms`, `source`
- Related terms should be comma-separated

## 🎨 Design

The design features:
- **Primary color**: Vibrant purple (#B794F6) for linguistic creativity
- **Secondary color**: Fresh teal (#14B8A6) for multilingual harmony
- **Accent color**: Coral (#FF7A59) for calls-to-action
- **Typography**: Outfit (display), Inter with Cyrillic support (body), JetBrains Mono (code)
- **Theme**: Full dark mode support with automatic detection

## 📂 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configs
│   └── index.html
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Database operations
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema + Zod validation
└── public/                 # Static assets (favicon)
```

## 🔐 Environment Variables

**Backend (.env):**
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret for session management
- `NODE_ENV`: Set to `production` for production builds

**Frontend (client/.env.production):**
- `VITE_API_URL`: Backend API URL (e.g., https://your-backend.onrender.com)

See `.env.example` and `client/.env.example` for templates.

## 🚀 Deployment

This project is configured for deployment with:
- **Frontend**: GitHub Pages (static hosting)
- **Backend**: Render (Node.js hosting)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed step-by-step deployment instructions.

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using modern web technologies
