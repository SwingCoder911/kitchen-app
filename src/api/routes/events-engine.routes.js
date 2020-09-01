const express = require('express');
const router = express.Router();
const SocketIO = require('socket.io');

const EventEngineService = require('../services/event-engine.service');
const setupRouter = (service) => {
  /**
   * This endpoint is soley a trigger to kick off the event processing event.
   */
  router.get('/', (req, res) => {
    service.processEvents();
    res.sendStatus(200);
  });
  return router;
};
module.exports = function (server) {
  const eventEngineService = new EventEngineService(SocketIO(server));
  eventEngineService.init();
  return setupRouter(eventEngineService);
};
