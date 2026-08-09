const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname), {
  extensions: ['html'],
  index: 'index.html'
}));

// Parse JSON bodies (for potential future API use)
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Djedi Church Website',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Client portal — serve index.html for /client-portal/ root
app.get('/client-portal', (req, res) => {
  res.sendFile(path.join(__dirname, 'client-portal', 'index.html'));
});

app.get('/client-portal/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client-portal', 'index.html'));
});

// Login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Catch-all: serve index.html for SPA-like routing
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, req.path);
  res.sendFile(filePath, (err) => {
    if (err) {
      // If file not found, try with .html extension
      res.sendFile(filePath + '.html', (err2) => {
        if (err2) {
          res.sendFile(path.join(__dirname, 'index.html'));
        }
      });
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`☉ Djedi Church server running on port ${PORT}`);
  console.log(`  Local:  http://localhost:${PORT}`);
  console.log(`  Health: http://localhost:${PORT}/api/health`);
});
