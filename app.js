// Base library requirements
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
require('dotenv').config();
const port = 4000;

// App requirements
const EventRoutes = require('./src/api/routes/events.routes.js');
const EventsEngineRoutes = require('./src/api/routes/events-engine.routes.js')(
  server
);

// Server setup uses
app.use(bodyParser.json());

// API definitions
app.use('/api/events', EventRoutes);
app.use('/api/events-engine', EventsEngineRoutes);
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
