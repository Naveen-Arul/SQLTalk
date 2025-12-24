const app = require('./src/app');
const path = require('path');
const express = require('express');

// Serve frontend static files (only in local development or if FRONTEND_DIST_PATH is set)
// In production, frontend should be deployed separately on Vercel
// IMPORTANT: This must come AFTER API routes are registered in app.js
if (process.env.FRONTEND_DIST_PATH || process.env.NODE_ENV !== 'production') {
    const frontendPath = process.env.FRONTEND_DIST_PATH || path.join(__dirname, '../frontend/dist');
    const fs = require('fs');
    
    // Check if frontend dist folder exists
    if (!fs.existsSync(frontendPath)) {
        console.warn(`Frontend dist folder not found at: ${frontendPath}`);
        console.warn('Static file serving disabled. Frontend should be built or deployed separately.');
    } else {
        // Serve static assets (JS, CSS, images, etc.) with proper MIME types
        // Only serve actual files, not directory listings
        app.use(express.static(frontendPath, {
            index: false,
            fallthrough: true, // Continue to next middleware if file not found
            setHeaders: (res, filePath) => {
                // Ensure JavaScript files are served with correct MIME type
                if (filePath.endsWith('.js')) {
                    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
                } else if (filePath.endsWith('.mjs')) {
                    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
                }
            }
        }));
        
        // Catch-all route for SPA - but ONLY for non-API routes and non-file requests
        // This should be the last route handler
        app.get('*', (req, res, next) => {
            // Skip API routes - these should already be handled
            if (req.path.startsWith('/api')) {
                return res.status(404).json({ error: 'API endpoint not found' });
            }
            
            // Skip if it looks like a file request (has extension)
            // Remove query string and hash for checking
            const pathWithoutQuery = req.path.split('?')[0].split('#')[0];
            const hasExtension = /\.[a-zA-Z0-9]+$/.test(pathWithoutQuery);
            
            if (hasExtension) {
                // If it has an extension but wasn't served by static middleware, it doesn't exist
                // Return 404 with proper content type
                res.status(404).type('text/plain').send('File not found');
                return;
            }
            
            // For all other routes (SPA routes), serve index.html
            const indexPath = path.join(frontendPath, 'index.html');
            if (fs.existsSync(indexPath)) {
                res.sendFile(indexPath);
            } else {
                res.status(404).json({ error: 'Frontend not built. Please build the frontend first.' });
            }
        });
    }
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});