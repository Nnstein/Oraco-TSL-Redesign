import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

console.log(`Starting server...`);
console.log(`Current directory: ${__dirname}`);

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Check if dist exists
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
    console.log(`dist directory found at ${distPath}`);
    console.log('Contents of dist:', fs.readdirSync(distPath));
} else {
    console.error(`CRITICAL: dist directory NOT found at ${distPath}`);
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Serve static files from the dist directory
app.use(express.static(distPath));

// Handle SPA routing: return index.html for all non-static file requests
app.get('*', (req, res) => {
    console.log(`Request for ${req.url}`);
    res.sendFile(path.join(distPath, 'index.html'));
});

const server = app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});
