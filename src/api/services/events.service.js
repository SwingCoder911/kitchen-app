const Event = require('../definitions/event.definition');
const DatabaseService = require('./database.service');

/**
 * Class: EventsService
 * Service meant to handle all event logic and transformations
 */
class EventsService {
  constructor() {
    this.db = new DatabaseService();
  }
  /**
   * Method: init
   * Setup event service with database setup
   */
  async init() {
    try {
      return await this.db.init();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   * Method: mergeEventStates
   * Update all the original events' eventName/eventTimes with the incoming event data
   * @param {[Event]} original
   * @param {[Event]} incoming
   */
  mergeEventStates(original, incoming) {
    const incomingMap = incoming.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
    const merged = original.map((originalEvent) => {
      originalEvent.updateEventNameFromEvent(incomingMap[originalEvent.id]);
      return originalEvent;
    });
    return merged;
  }

  /**
   * Method: findEvent
   * Find an event by id and return the full Event object
   * @param {number} id
   */
  async findEvent(id) {
    try {
      const found = await this.db.findEvent(id);
      if (!found) {
        return null;
      }
      return new Event(found, { fromMongo: true });
    } catch (e) {
      console.log('found error: ', e.message);
      throw new Error(e.message);
    }
  }

  /**
   * Method: findEvents
   * Find set of events by ids and return the full set of Events
   * @param {[number]} id
   */
  async findEvents(eventIds) {
    try {
      const found = await this.db.findEvents(eventIds);
      return found.map((event) => new Event(event, { fromMongo: true }));
    } catch (e) {
      console.log('found error: ', e.message);
      throw new Error(e.message);
    }
  }

  /**
   * Method: findAndUpdateEvent
   * Find an event by the id and update the eventName and eventTime with the new data from event
   * @param {number} id
   * @param {Event} event
   */
  async findAndUpdateEvent(id, event) {
    try {
      const found = await this.db.findAndUpdateEvent(id, event.getMongoJSON());
      if (!found) {
        return null;
      }
      return new Event(found, { fromMongo: true });
    } catch (e) {
      console.log('found error: ', e.message);
      throw new Error(e.message);
    }
  }

  /**
   * Method: queueEvents
   * Take a list of raw event data. Update the eventName/eventTime where ids exist and create events where they don't exist
   * @param {[event]} eventData
   */
  async queueEvents(eventData) {
    try {
      const constructedEvents = eventData.map((event) => new Event(event));
      const constructedIds = constructedEvents.map(({ id }) => id);

      // Get list of events that exist
      const foundEvents = await this.findEvents(constructedIds);
      const foundIds = foundEvents.map(({ id }) => id);

      // Get list of new events
      const newEvents = !foundIds.length
        ? constructedEvents
        : constructedEvents.filter((event) => !foundIds.includes(event.id));
      const updateableEvents = !foundEvents.length
        ? []
        : this.mergeEventStates(foundEvents, constructedEvents);

      // Update existing events
      if (updateableEvents.length) {
        await this.db.updateEventsEventName(updateableEvents);
      }

      // Create new events
      if (newEvents.length) {
        await this.db.insertEvents(
          newEvents.map((event) => event.getMongoJSON())
        );
      }
      return true;
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  /**
   * Method: updateEvent
   * Update event in database with id to have event data
   * @param {number} id
   * @param {event} data
   */
  async updateEvent(id, data) {
    try {
      const foundEvent = await this.findEvent(id);
      if (!foundEvent) {
        return null;
      }
      foundEvent.updateEventData(data);
      return await this.findAndUpdateEvent(id, foundEvent);
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  /**
   * Method: createEvent
   * Create brand new event and get the event data back
   *
   * @param {event} event
   */
  async createEvent(event) {
    try {
      const createdId = await this.db.createEvent(event);
      if (!createdId) {
        return null;
      }
      return await this.findEvent(createdId);
    } catch (e) {
      console.log('found error: ', e.message);
      throw new Error(e.message);
    }
  }

  /**
   * Method: getActiveOrders
   * Get all currently active orders
   */
  async getActiveOrders() {
    try {
      const found = await this.db.getEventsByEventNames(Event.ACTIVE_EVENTS);
      const eventList = found.map(
        (event) => new Event(event, { fromMongo: true })
      );
      return eventList.sort(Event.sortEventList);
    } catch (e) {
      console.log('found error: ', e.message);
      throw new Error(e.message);
    }
  }

  /**
   * Method: getProcessedOrders
   * Get all orders that have already been processed
   */
  async getProcessedOrders() {
    try {
      const found = await this.db.getEventsByEventNames(Event.COMPLETED_EVENTS);
      const eventList = found.map(
        (event) => new Event(event, { fromMongo: true })
      );
      return eventList.sort(Event.sortEventList);
    } catch (e) {
      console.log('found error: ', e.message);
      throw new Error(e.message);
    }
  }
}

module.exports = EventsService;
