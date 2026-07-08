const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const outDir = path.join(__dirname, 'out');
const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json',
};

// Cache files in memory for faster serving
const fileCache = new Map();

function getFile(filePath) {
  if (fileCache.has(filePath)) return fileCache.get(filePath);
  try {
    const data = fs.readFileSync(filePath);
    fileCache.set(filePath, data);
    return data;
  } catch (e) {
    return null;
  }
}

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  let filePath = path.join(outDir, urlPath === '/' ? '/index.html' : urlPath);

  // Prevent directory traversal
  if (!filePath.startsWith(outDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // Try .html extension for clean URLs
  if (!fs.existsSync(filePath) && !path.extname(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    }
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  const data = getFile(filePath);

  if (!data) {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  // Use synchronous gzip to avoid crashes with async callbacks
  const acceptEncoding = req.headers['accept-encoding'] || '';
  if (acceptEncoding.includes('gzip') && data.length > 1024) {
    try {
      const compressed = zlib.gzipSync(data);
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Encoding': 'gzip',
        'Cache-Control': 'public, max-age=3600',
      });
      res.end(compressed);
    } catch (e) {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      });
      res.end(data);
    }
  } else {
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600',
    });
    res.end(data);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Static server running at http://localhost:' + PORT);
});

// Keep process alive
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err.message);
});
