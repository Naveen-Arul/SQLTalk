# Vercel Deployment Configuration Guide

## Vercel Project Settings

Based on your current Vercel configuration, here's what you need to set:

### ✅ Already Correct Settings

These settings are already correct in your Vercel dashboard:

- **Framework Preset**: `Vite` ✓
- **Root Directory**: `frontend` ✓
- **Build Command**: `vite build` ✓
- **Output Directory**: `dist` ✓
- **Install Command**: `npm install` (or yarn/pnpm/bun) ✓

### 🔑 Required Environment Variables

You need to add **ONE** environment variable in Vercel:

#### Environment Variable to Add:

| Key | Value | Description |
|-----|-------|-------------|
| `VITE_API_BASE_URL` | `https://your-backend.onrender.com` | Your Render backend URL |

**Example:**
```
VITE_API_BASE_URL=https://db-chat-backend.onrender.com
```

### 📝 Step-by-Step Instructions

1. **Go to your Vercel project settings**
   - Navigate to: Project → Settings → Environment Variables

2. **Add the environment variable:**
   - Click "Add New"
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: Your Render backend URL (e.g., `https://db-chat-backend.onrender.com`)
   - **Environment**: Select all (Production, Preview, Development)
   - Click "Save"

3. **Redeploy after adding environment variable:**
   - Vercel requires a rebuild for environment variables to take effect
   - Go to Deployments tab
   - Click the three dots (⋯) on the latest deployment
   - Select "Redeploy"

### 🔍 How to Find Your Backend URL

If you haven't deployed the backend yet:

1. **Deploy backend on Render first** (using `render.yaml`)
2. **Get the backend URL** from Render dashboard (e.g., `https://db-chat-backend.onrender.com`)
3. **Test the backend** by visiting: `https://your-backend.onrender.com/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

### ⚠️ Important Notes

1. **Vite Environment Variables:**
   - Vite requires the `VITE_` prefix for environment variables to be exposed to the client
   - The variable will be available as `import.meta.env.VITE_API_BASE_URL` in your code

2. **Fallback Behavior:**
   - If `VITE_API_BASE_URL` is not set, the frontend will try to use the same host as the frontend
   - For Vercel deployments, it defaults to `https://sqltalk-backend.onrender.com` (hardcoded fallback)
   - **Best practice**: Always set `VITE_API_BASE_URL` explicitly

3. **CORS Configuration:**
   - Make sure your Render backend has your Vercel URL in `ALLOWED_ORIGINS`
   - Example: `ALLOWED_ORIGINS=https://sql-talk.vercel.app,https://sql-talk-git-main.vercel.app`

### 🧪 Testing After Deployment

1. **Visit your Vercel URL** (e.g., `https://sql-talk.vercel.app`)

2. **Open browser console** (F12) and check:
   - No CORS errors
   - Network requests going to your backend URL

3. **Test the application:**
   - Try submitting a query
   - Check if API calls are successful

### 📋 Complete Vercel Configuration Summary

```
Project Name: sql-talk
Framework Preset: Vite
Root Directory: frontend
Build Command: vite build
Output Directory: dist
Install Command: npm install

Environment Variables:
  VITE_API_BASE_URL = https://your-backend.onrender.com
```

### 🚨 Common Issues

**Issue**: Frontend can't connect to backend
- **Solution**: Check that `VITE_API_BASE_URL` is set correctly
- **Solution**: Verify backend is running and accessible
- **Solution**: Check CORS settings on backend

**Issue**: Environment variable not working
- **Solution**: Rebuild/redeploy after adding environment variable
- **Solution**: Ensure variable name starts with `VITE_`
- **Solution**: Check that variable is set for the correct environment (Production/Preview)

**Issue**: Build fails
- **Solution**: Check that Root Directory is set to `frontend`
- **Solution**: Verify `package.json` exists in `frontend/` directory
- **Solution**: Check build logs for specific errors

### ✅ Final Checklist

Before deploying, ensure:

- [ ] Backend is deployed on Render and accessible
- [ ] Backend URL is known (e.g., `https://db-chat-backend.onrender.com`)
- [ ] `VITE_API_BASE_URL` environment variable is set in Vercel
- [ ] Root Directory is set to `frontend` in Vercel
- [ ] Build Command is `vite build`
- [ ] Output Directory is `dist`
- [ ] Backend CORS allows your Vercel domain
- [ ] Redeploy after setting environment variables

That's it! Your Vercel deployment should work with just the `VITE_API_BASE_URL` environment variable.

