# Deployment Issues Analysis & Fixes

## Issues Found and Fixed

### ✅ 1. Critical Bug in `backend/server.js`
**Issue**: Missing `express` import on line 10 where `express.static()` was used.
**Fix**: Added `const express = require('express');` import.
**Impact**: This would have caused the backend to crash on startup.

### ✅ 2. Render Configuration (`render.yaml`)
**Issues**:
- Missing `rootDir: backend` - Render needs to know the backend is in a subdirectory
- `startCommand` was `npm run start` but should be `npm start` (package.json has `start` not `start:script`)
- Missing `NODE_ENV=production` environment variable
- Missing `ALLOWED_ORIGINS` environment variable for CORS configuration

**Fixes Applied**:
- Added `rootDir: backend` to point Render to the correct directory
- Changed `startCommand` to `npm start`
- Added `NODE_ENV=production` environment variable
- Added `ALLOWED_ORIGINS` environment variable (needs to be set in Render dashboard)

### ✅ 3. Vercel Configuration (`frontend/vercel.json`)
**Issues**:
- Using deprecated `builds` array format
- Environment variable syntax was incorrect

**Fixes Applied**:
- Updated to modern Vercel configuration format
- Simplified rewrites pattern
- Removed incorrect env syntax (environment variables should be set in Vercel dashboard, not in vercel.json)

### ⚠️ 4. Deployment Architecture Considerations

**Current Setup**: 
- Frontend → Vercel (static site)
- Backend → Render (Node.js server)

**Important Notes**:
1. **Separate Deployments**: Frontend and backend are deployed separately, which is correct for this architecture.
2. **Static File Serving**: The backend's static file serving code (lines 10-13 in server.js) is now conditional - it only runs if `FRONTEND_DIST_PATH` is set or in non-production mode. This is correct for separated deployments.
3. **CORS Configuration**: The backend's CORS is configured to allow Vercel domains. Make sure to add your actual Vercel deployment URL to `ALLOWED_ORIGINS` environment variable.

## Deployment Instructions

### Backend on Render

1. **Create a new Web Service** on Render
2. **Connect your GitHub repository**
3. **Configure the service**:
   - **Root Directory**: `backend` (or use the render.yaml which now specifies this)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Set Environment Variables**:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `AI_KEY`: Your Groq API key
   - `PORT`: `10000` (or let Render assign it)
   - `NODE_ENV`: `production`
   - `ALLOWED_ORIGINS`: Your Vercel frontend URL(s), comma-separated (e.g., `https://your-app.vercel.app,https://your-app-git-main.vercel.app`)
5. **Deploy**: Render will automatically use `render.yaml` if present, or you can configure manually

### Frontend on Vercel

1. **Create a new project** on Vercel
2. **Connect your GitHub repository**
3. **Configure the project**:
   - **Root Directory**: `frontend` (IMPORTANT: Set this in Vercel dashboard)
   - **Framework Preset**: Vite (or Other)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
4. **Set Environment Variables**:
   - `VITE_API_BASE_URL`: Your Render backend URL (e.g., `https://db-chat-backend.onrender.com`)
5. **Deploy**: Vercel will automatically build and deploy

## Testing Deployment

### Backend Health Check
```bash
curl https://your-backend.onrender.com/health
```

Expected response:
```json
{"status":"OK","message":"Server is running"}
```

### Frontend
- Visit your Vercel URL
- Check browser console for any CORS errors
- Test the API connection by submitting a query

## Common Issues & Solutions

### CORS Errors
**Symptom**: Frontend can't connect to backend, CORS errors in console.
**Solution**: 
1. Add your Vercel URL to `ALLOWED_ORIGINS` in Render environment variables
2. Include both the main domain and preview deployment domains (e.g., `*.vercel.app`)

### Environment Variables Not Working
**Symptom**: Frontend can't find backend API.
**Solution**: 
1. Ensure `VITE_API_BASE_URL` is set in Vercel dashboard
2. Rebuild the frontend after setting environment variables (Vite requires rebuild for env vars)

### Backend Not Starting
**Symptom**: Render deployment fails or backend crashes.
**Solution**:
1. Check Render logs for error messages
2. Verify all required environment variables are set
3. Ensure `DATABASE_URL` is correct and database is accessible
4. Check that `AI_KEY` is valid

### Build Failures
**Symptom**: Vercel build fails.
**Solution**:
1. Ensure root directory is set to `frontend` in Vercel dashboard
2. Check that all dependencies are in `package.json`
3. Review build logs for specific errors

## Additional Recommendations

1. **Database**: Ensure your PostgreSQL database on Render (or external provider) is accessible from the backend service
2. **API Keys**: Never commit API keys to the repository. Always use environment variables
3. **Monitoring**: Set up health check endpoints and monitoring for both services
4. **Logging**: Consider adding structured logging for better debugging in production

