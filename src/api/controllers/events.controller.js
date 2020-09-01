const HttpHandler = require('../handlers/http.handler');
const EventsService = require('../services/events.service');
const eventsService = new EventsService();
eventsService.init();
/**
 * Controller for all events functionality
 */
class EventsController {
  /**
   * POST: /events/:id
   * Update event based on id
   */
  static async updateEvent(req, res) {
    try {
      const { id } = req.params;
      const { body: data } = req;
      const newEvent = await eventsService.updateEvent(id, data);
      if (!newEvent) {
        HttpHandler.noResults(res, 'event');
        return;
      }
      HttpHandler.sendResultObject(res, newEvent);
    } catch (e) {
      HttpHandler.error(res, e);
    }
  }

  /**
   * POST: /events/
   * Receive event set
   */
  static async postEvents(req, res) {
    try {
      const { events } = req.body;
      await eventsService.queueEvents(events);
      HttpHandler.success(res);
    } catch (e) {
      HttpHandler.error(res, e);
    }
  }

  /**
   * GET: /events/
   * Return active events
   */
  static async getActiveEvents(req, res) {
    try {
      const events = await eventsService.getActiveOrders();
      if (!events.length) {
        HttpHandler.noResults(res, 'events');
        return;
      }
      HttpHandler.sendResultList(res, events);
    } catch (e) {
      HttpHandler.error(res, e);
    }
  }

  /**
   * GET: /events/historical
   * Show historical events
   */
  static async getHistoricalEvents(req, res) {
    try {
      const events = await eventsService.getHistoricalOrders();
      if (!events.length) {
        HttpHandler.noResults(res, 'events');
        return;
      }
      HttpHandler.sendResultList(res, events);
    } catch (e) {
      HttpHandler.error(res, e);
    }
  }
}
module.exports = EventsController;
