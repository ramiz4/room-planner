const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist/room-planner/browser')));

// Handle Chrome DevTools PWA debugging endpoint
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.status(200).json({
    'chrome-devtools': {
      webSocketDebuggerUrl: 'ws://localhost:8080/debug',
    },
  });
});

// Handle Angular routes (fallback to index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/room-planner/browser/index.html'));
});

app.listen(port, () => {
  console.log(`PWA server running at http://localhost:${port}`);
});
