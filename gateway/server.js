const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Health check endpoint (required by lab)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    service: 'API Gateway',
    version: '1.0.0',
    endpoints: ['/health', '/api/*']
  });
});

// Important: Listen on all network interfaces (0.0.0.0) for container
app.listen(port, '0.0.0.0', () => {
  console.log(`Gateway running on port ${port}`);
});
