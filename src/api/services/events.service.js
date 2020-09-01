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
  async init() {
    return await this.db.init();
  }
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
  async findEvents(eventIds) {
    try {
      const found = await this.db.findEvents(eventIds);
      return found.map((event) => new Event(event, { fromMongo: true }));
    } catch (e) {
      console.log('found error: ', e.message);
      throw new Error(e.message);
    }
  }
  async findAndUpdateEvent(id, event) {
    try {
      const { value: found } = await this.db.findAndUpdateEvent(
        id,
        event.getMongoJSON()
      );
      if (!found) {
        return null;
      }
      return new Event(found, { fromMongo: true });
    } catch (e) {
      console.log('found error: ', e.message);
      throw new Error(e.message);
    }
  }
  async queueEvents(eventData) {
    try {
      // Events are coming from queue here
      const constructedEvents = eventData.map(
        (event) => new Event(event, { fromExternal: true })
      );
      const constructedIds = constructedEvents.map(({ id }) => id);
      const foundEvents = await this.findEvents(constructedIds);
      const foundIds = foundEvents.map(({ id }) => id);
      const newEvents = constructedEvents.filter(
        (event) => !foundIds.includes(event.id)
      );
      const updateableEvents = this.mergeEventStates(
        foundEvents,
        constructedEvents
      );
      // const merged = this.mergeEvents(foundEvents, constructedEvents);
      const updateResults = await this.db.updateEventsEventName(
        updateableEvents
      );
      const insertResults = await this.db.insertEvents(newEvents);
      return true;
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }
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
  async getActiveOrders() {
    try {
      const found = await this.db.getEventsByEventNames(Event.ACTIVE_EVENTS);
      return found.map((event) => new Event(event, { fromMongo: true }));
    } catch (e) {
      console.log('found error: ', e.message);
      throw new Error(e.message);
    }
  }
  async getHistoricalOrders() {
    try {
      const found = await this.db.getEventsByEventNames(Event.COMPLETED_EVENTS);
      return found.map((event) => new Event(event, { fromMongo: true }));
    } catch (e) {
      console.log('found error: ', e.message);
      throw new Error(e.message);
    }
  }
}

module.exports = EventsService;
