# Deployment Guide: Render (Backend) + GitHub Pages (Frontend)

This guide will help you deploy your Digital Humanities Dictionary with:
- **Frontend**: Hosted on GitHub Pages at `https://www.digwords.online`
- **Backend API**: Hosted on Render at `https://digwords-api.onrender.com`

---

## 📋 Prerequisites

- [x] GitHub account with repository created
- [x] Render account (free tier works) - [Sign up here](https://render.com)
- [x] PostgreSQL database (Neon recommended) - [Get free database](https://neon.tech)
- [x] Custom domain configured (digwords.online)

---

## Part 1: Deploy Backend to Render

### Step 1: Create Production Database

1. Go to [Neon.tech](https://neon.tech) (or your PostgreSQL provider)
2. Create a new database named `digwords-production`
3. Copy the connection string (format: `postgresql://user:password@host/database`)
4. Save it - you'll need it in Step 4

### Step 2: Push Code to GitHub

```bash
# Make sure all changes are committed
git add .
git commit -m "Configure for Render deployment"
git push origin main
```

### Step 3: Create Render Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your `digital-humanities-dictionary` repository

### Step 4: Configure Render Service

**Basic Settings:**
- **Name**: `digwords-api` (or your preferred name)
- **Region**: Frankfurt (or closest to your users)
- **Branch**: `main`
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

**Environment Variables** (click "Advanced" → "Add Environment Variable"):

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | Your PostgreSQL connection string from Step 1 |
| `SESSION_SECRET` | Generate random string (use: `openssl rand -base64 32`) |

**Advanced Settings:**
- **Auto-Deploy**: Yes (deploys on git push)
- **Health Check Path**: `/api/terms`

Click **"Create Web Service"**

### Step 5: Push Database Schema

After Render deployment completes (5-10 minutes), push your database schema:

```bash
# Install Drizzle Kit globally (if not already installed)
npm install -g drizzle-kit

# Set your production DATABASE_URL temporarily
export DATABASE_URL="your_production_database_url_here"

# Push schema to production database
npm run db:push
```

You should see output like:
```
✓ Database schema pushed successfully
```

### Step 6: Verify Backend

1. Go to your Render dashboard
2. Click on your `digwords-api` service
3. Copy the URL (looks like: `https://digwords-api.onrender.com`)
4. Test it in browser: `https://digwords-api.onrender.com/api/terms`
5. You should see an empty array `[]` (database has no terms yet)

---

## Part 2: Deploy Frontend to GitHub Pages

### Step 7: Update Frontend Configuration

1. Edit `client/.env.production` file:
```env
VITE_API_URL=https://digwords-api.onrender.com
```
Replace with your actual Render URL from Step 6.

### Step 8: Build Frontend for Production

```bash
# Build the frontend with production environment
npm run build
```

This creates optimized files in `dist/public/`

### Step 9: Deploy to GitHub Pages

**Option A: Using GitHub Actions (Recommended)**

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build frontend
        run: npm run build
        env:
          VITE_API_URL: https://digwords-api.onrender.com
          
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/public
          cname: www.digwords.online
```

2. Commit and push:
```bash
git add .github/workflows/deploy.yml
git add client/.env.production
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

3. Go to your GitHub repository → **Settings** → **Pages**
4. Source: Select `gh-pages` branch
5. Custom domain: `www.digwords.online`
6. Wait 2-3 minutes for deployment

**Option B: Manual Deployment**

```bash
# Build frontend
npm run build

# Navigate to dist/public
cd dist/public

# Initialize git (if not already)
git init
git add .
git commit -m "Deploy to GitHub Pages"

# Force push to gh-pages branch
git push -f https://github.com/YOUR_USERNAME/YOUR_REPO.git main:gh-pages

# Return to root
cd ../..
```

### Step 10: Configure Custom Domain

1. In your GitHub repository: **Settings** → **Pages**
2. Custom domain: Enter `www.digwords.online`
3. Click **Save**
4. Wait for DNS check (can take a few minutes)
5. Enable **"Enforce HTTPS"** (after DNS propagates)

---

## Part 3: Import Data

### Step 11: Upload Terms via Admin Interface

1. Go to `https://www.digwords.online/admin`
2. Upload your Excel file with dictionary terms
3. File should have columns:
   - `section` (category)
   - `term` (Russian term)
   - `definition` (explanation)
   - `usageExample` (optional)
   - `englishEquivalent` (optional)
   - `relatedTerms` (comma-separated, optional)
   - `source` (optional)

4. Click upload and wait for processing
5. Go to homepage to verify terms appear

---

## 🔄 Updates & Maintenance

### Updating Backend Code

```bash
git add .
git commit -m "Update backend feature"
git push origin main
```

Render auto-deploys within 2-5 minutes.

### Updating Frontend Code

```bash
# Update code
git add .
git commit -m "Update frontend feature"
git push origin main
```

If using GitHub Actions, deployment happens automatically.
If manual, run `npm run build` and push to gh-pages branch.

### Updating Database Schema

```bash
# 1. Update shared/schema.ts
# 2. Push to production database
export DATABASE_URL="your_production_database_url"
npm run db:push
```

---

## 🐛 Troubleshooting

### Problem: Terms not loading on website

**Solution:**
1. Check Render logs: Dashboard → Service → Logs
2. Verify DATABASE_URL is set correctly
3. Ensure database schema was pushed (`npm run db:push`)
4. Test API directly: `https://your-backend.onrender.com/api/terms`

### Problem: CORS errors in browser console

**Solution:**
1. Check that `www.digwords.online` is in allowed origins (server/index.ts)
2. Verify VITE_API_URL in `client/.env.production` matches your Render URL
3. Rebuild frontend: `npm run build`

### Problem: Admin page not working

**Solution:**
1. Admin page requires backend API
2. Check browser console for errors (F12)
3. Verify API URL is correct in frontend config
4. Test backend upload endpoint: `curl -X POST https://your-backend.onrender.com/api/upload-excel`

### Problem: Render service sleeping (free tier)

**Note:** Free tier services sleep after 15 minutes of inactivity. First request may take 30-60 seconds to wake up.

**Solution:** Upgrade to paid tier ($7/month) for always-on service.

---

## 📊 Architecture Diagram

```
┌─────────────────────────────────────┐
│  GitHub Pages (Static Files)        │
│  www.digwords.online                │
│  - HTML, CSS, JS                    │
│  - Images, Fonts                    │
└──────────────┬──────────────────────┘
               │
               │ API Calls
               ↓
┌─────────────────────────────────────┐
│  Render Web Service (Node.js)       │
│  digwords-api.onrender.com          │
│  - Express Server                   │
│  - REST API (/api/*)                │
│  - File Upload Handler              │
└──────────────┬──────────────────────┘
               │
               │ SQL Queries
               ↓
┌─────────────────────────────────────┐
│  Neon PostgreSQL Database            │
│  - terms table                       │
│  - Persistent storage                │
└─────────────────────────────────────┘
```

---

## 🎉 Success!

Your Digital Humanities Dictionary is now live with:
- ✅ Beautiful frontend on your custom domain
- ✅ Scalable backend API on Render
- ✅ Managed PostgreSQL database
- ✅ Admin interface for data management
- ✅ HTTPS security
- ✅ Automatic deployments

Visit: [https://www.digwords.online](https://www.digwords.online)

---

## 💰 Cost Breakdown

- **GitHub Pages**: Free
- **Render Free Tier**: Free (with sleep after inactivity)
- **Render Starter**: $7/month (always on, better performance)
- **Neon Free Tier**: Free up to 0.5GB storage
- **Domain (REG.RU)**: ~$10/year (you already have this)

**Total for free tier**: $0/month (+ domain)
**Total for production**: $7/month (+ domain)
