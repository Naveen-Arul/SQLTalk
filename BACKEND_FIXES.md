# Backend Route and Static File Serving Fixes

## Issues Fixed

### 1. "Cannot GET /" Error
**Problem**: Root route was being intercepted or not working properly.

**Solution**: 
- Removed duplicate root route definition in `server.js` (app.js already has one)
- Ensured API routes are registered before static file serving
- Added proper error handling for unmatched routes

### 2. Module Script MIME Type Error
**Problem**: JavaScript files were being served as `text/html` instead of `application/javascript`, causing browser errors like:
```
Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/html"
```

**Solution**:
- Added explicit MIME type headers for `.js` and `.mjs` files
- Improved file extension detection to prevent catch-all route from serving HTML for file requests
- Added `fallthrough: true` to static middleware so missing files don't get served as HTML
- Better handling of file requests with query strings

## Changes Made

### `backend/server.js`

1. **Added express import** (was missing, causing potential crashes)
2. **Improved static file serving**:
   - Checks if frontend dist folder exists before trying to serve
   - Sets correct MIME types for JavaScript files
   - Uses `fallthrough: true` to properly handle missing files
3. **Better catch-all route**:
   - Explicitly skips API routes (`/api/*`)
   - Skips file requests (anything with a file extension)
   - Only serves `index.html` for actual SPA routes
   - Handles query strings and URL fragments properly

## Testing the Fixes

### 1. Test Backend API Routes

```bash
# Test root route
curl http://localhost:5000/

# Expected response:
# {"message":"SQLTalk Backend API","status":"running"}

# Test health endpoint
curl http://localhost:5000/health

# Expected response:
# {"status":"OK","message":"Server is running"}

# Test API endpoint
curl http://localhost:5000/api/data
```

### 2. Test Static File Serving (Local Development)

If running locally with frontend built:

```bash
# Build frontend first
cd frontend
npm run build
cd ..

# Start backend
cd backend
npm start
```

Then visit `http://localhost:5000` - should serve frontend.

### 3. Check for Common Issues

**Issue**: Frontend dist folder doesn't exist
- **Solution**: Build the frontend first with `cd frontend && npm run build`

**Issue**: Still getting MIME type errors
- **Check**: Ensure the frontend is built and the dist folder exists
- **Check**: Verify the file paths in the built HTML match the actual file locations
- **Check**: Clear browser cache and hard refresh (Ctrl+Shift+R)

**Issue**: API routes return 404
- **Check**: Ensure you're using `/api/` prefix (e.g., `/api/analyze`, not `/analyze`)
- **Check**: Verify routes are registered in `app.js`

## Production Deployment Notes

### On Render (Backend Only)
- Static file serving is **disabled** in production (`NODE_ENV=production`)
- Backend only serves API endpoints
- Frontend should be deployed separately on Vercel

### On Vercel (Frontend Only)
- Frontend is built and served as static files
- API calls go to the Render backend URL
- Set `VITE_API_BASE_URL` environment variable in Vercel

## Environment Variables

For local development with frontend served from backend:
```env
NODE_ENV=development
# or
FRONTEND_DIST_PATH=/path/to/frontend/dist
```

For production (Render):
```env
NODE_ENV=production
PORT=10000
DATABASE_URL=your_database_url
AI_KEY=your_ai_key
ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

## Debugging

If you're still experiencing issues:

1. **Check server logs** for warnings about missing frontend dist folder
2. **Verify route registration order**:
   - API routes first (in `app.js`)
   - Static file serving last (in `server.js`)
3. **Test API endpoints directly** with curl or Postman
4. **Check browser network tab** to see what MIME types are being returned
5. **Verify frontend build** - ensure `frontend/dist` folder exists and contains built files

## Next Steps

1. **Rebuild the frontend** if you haven't already:
   ```bash
   cd frontend
   npm run build
   ```

2. **Restart the backend server**:
   ```bash
   cd backend
   npm start
   ```

3. **Test the endpoints** using the curl commands above

4. **If deploying to Render**, ensure `NODE_ENV=production` is set so static file serving is disabled

