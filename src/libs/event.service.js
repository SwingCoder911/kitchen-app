import API from './api';
import Event from '../models/event.model';

/**
 * Class: EventService
 * Handle server side operations to return Event objects
 */
export default class EventService {
  /**
   * Method: updateEvent
   * Update single event
   * @param {number} id
   * @param {Event} event
   */
  static async updateEvent(id, event) {
    try {
      const eventData = await API.updateEvent(id, event);
      if (!eventData) {
        return null;
      }
      return new Event(eventData);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   * Method: createEvent
   * Create event
   * @param {event} event
   */
  static async createEvent(event) {
    try {
      const eventData = await API.createEvent(event);
      if (!eventData) {
        return null;
      }
      return new Event(eventData);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   * Method: getEvents
   * Get a list of active Events
   */
  static async getEvents() {
    try {
      const eventData = await API.getActiveEvents();
      if (!eventData) {
        return [];
      }
      return eventData.map((event) => new Event(event));
    } catch (e) {
      console.log('getevents error: ', e);
      throw new Error(e.message);
    }
  }

  /**
   * Method: getProcessedEvents
   * Get a list of processed Events
   */
  static async getProcessedEvents() {
    try {
      const eventData = await API.getProcessedEvents();
      if (!eventData) {
        return [];
      }
      return eventData.map((event) => new Event(event));
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
