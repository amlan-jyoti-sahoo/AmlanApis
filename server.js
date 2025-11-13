// server.js
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());

const PORT = process.env.PORT || 3000;

// Import countries routes
const countriesRoutes = require('./routes/countries');

// Use the countries routes
app.use('/countries', countriesRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`👉 Try: http://localhost:${PORT}/countries?offset=0&limit=5`);
});