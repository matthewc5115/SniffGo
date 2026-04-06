const express = require('express');
const app = express();

// Toggle this via env variables or a database flag
let isMaintenanceMode = process.env.MAINTENANCE === 'false';

app.use((req, res, next) => {
  if (isMaintenanceMode) {
    // Redirect or serve a static maintenance page
    return res.status(503).sendFile('maintenance.html');
  }
  next();
});
