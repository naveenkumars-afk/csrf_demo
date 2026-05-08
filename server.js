// Simple HTTP server to serve the CSRF attack page from a different origin (port 8888)
// Run: node csrf_demo/server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8888;

http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'attack.html');
  // eslint-disable-next-line consistent-return
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading attack.html');
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}).listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`
  ╔══════════════════════════════════════════════════════╗
  ║          CSRF ATTACK PAGE SERVER STARTED             ║
  ║                                                      ║
  ║  Attacker page: http://localhost:${PORT}               ║
  ║  Target app:    http://localhost:5000                ║
  ║                                                      ║
  ║  Step-by-step:                                       ║
  ║  1. Start mycamu backend:  node app.js -e dev        ║
  ║  2. Log in at:  http://localhost:5000 (or :3003)     ║
  ║  3. Keep that tab open (stay logged in)              ║
  ║  4. Open NEW tab: http://localhost:${PORT}              ║
  ║  5. Click "Claim Prize"                              ║
  ║  6. Go back to mycamu tab and refresh               ║
  ║  7. You are now LOGGED OUT — CSRF attack succeeded!  ║
  ╚══════════════════════════════════════════════════════╝
  `);
});
