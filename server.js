require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/api/routes/routes');
const tidbConnection = require('./src/db/tiDB');

// Setting up the Express server
const app = express();

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Attaching the TiDB connection to the request object
app.use((req, res, next) => {
  req.db = tidbConnection;
  next();
});

// Set up root routes
app.use('/', routes);

// Error management middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server Error' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server will be running at http://localhost:${port}`);
});