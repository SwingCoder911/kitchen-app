/**
 * Event Engine Routes
 * This router file should handle all the route management of the event engine
 * Note: It takes the server instance and passes it through as a socket handler to the service
 */
const express = require('express');
const router = express.Router();
const SocketIO = require('socket.io');

const EventEngineService = require('../services/event-engine.service');
const setupRouter = (server) => {
  /**
   * Create a socket instance from the server and pass it to the event engine
   */
  const eventEngineService = new EventEngineService(SocketIO(server));
  eventEngineService.init();
  /**
   * This endpoint is solely a trigger to kick off the event processing event.
   */
  router.get('/', (req, res) => {
    eventEngineService.runEventEngine();
    res.sendStatus(200);
  });
  router.get('/state', (req, res) => {
    res.send({ state: eventEngineService.getState() });
  });
  router.get('/pause', (req, res) => {
    eventEngineService.pause();
    res.sendStatus(200);
  });
  router.get('/continue', (req, res) => {
    eventEngineService.continue();
    res.sendStatus(200);
  });
  router.get('/stop', (req, res) => {
    eventEngineService.stop();
    res.sendStatus(200);
  });
  return router;
};
module.exports = (server) => setupRouter(server);
