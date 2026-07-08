const http = require('http');
const fs = require('fs');
const path = require('path');

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

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  let filePath = path.join(outDir, urlPath);
  if (!filePath.startsWith(outDir)) { res.writeHead(403); res.end(); return; }

  if (!fs.existsSync(filePath) && !path.extname(filePath)) {
    if (fs.existsSync(filePath + '.html')) filePath += '.html';
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  const fileStream = fs.createReadStream(filePath);
  fileStream.on('open', () => {
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600',
    });
    fileStream.pipe(res);
  });
  fileStream.on('error', () => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Static server running at http://localhost:' + PORT);
});

// Keep-alive: send self-request every 30 seconds to prevent sandbox kill
setInterval(() => {
  http.get('http://localhost:' + PORT + '/', (res) => {
    res.resume(); // drain response
  }).on('error', () => {
    // Server might be shutting down, ignore
  });
}, 30000);

process.on('uncaughtException', (err) => {
  console.error('Error:', err.message);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, keeping alive...');
  // Don't exit — keep running
});

process.on('SIGINT', () => {
  console.log('SIGINT received, keeping alive...');
  // Don't exit — keep running
});
