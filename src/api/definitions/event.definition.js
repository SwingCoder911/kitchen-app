const { configList } = require('../../event.config');
/**
 * Class: Event
 * This class is meant to define and handle all the event object operations
 */
class Event {
  static DEFAULT_OPTIONS = {
    fromMongo: false,
  };
  static EVENT_NAMES = configList.reduce((acc, eventName) => {
    acc[eventName] = eventName;
    return acc;
  }, {});
  /**
   * Ordered list of all active events
   */
  static ACTIVE_EVENTS = [
    Event.EVENT_NAMES.CREATED,
    Event.EVENT_NAMES.COOKED,
    Event.EVENT_NAMES.DRIVER_RECEIVED,
  ];
  /**
   * Ordered list of all completed events
   */
  static COMPLETED_EVENTS = [
    Event.EVENT_NAMES.CANCELLED,
    Event.EVENT_NAMES.DELIVERED,
  ];
  /**
   * Explicit ordered list of all event priorities
   */
  static EVENT_PRIORITY = [
    Event.EVENT_NAMES.CREATED,
    Event.EVENT_NAMES.COOKED,
    Event.EVENT_NAMES.DRIVER_RECEIVED,
    Event.EVENT_NAMES.DELIVERED,
    Event.EVENT_NAMES.CANCELLED,
  ];
  constructor(data, options = Event.DEFAULT_OPTIONS) {
    const { fromMongo } = options;
    if (fromMongo) {
      this.id = data._id !== undefined ? data._id : '';
    } else {
      this.id = data.id !== undefined ? data.id : '';
    }
    this.eventName = data.eventName !== undefined ? data.eventName : '';
    this.destination = data.destination !== undefined ? data.destination : '';
    this.name = data.name !== undefined ? data.name : '';
    this.eventTime = data.eventTime !== undefined ? data.eventTime : -1;
  }

  /**
   * Method: updateEventData
   * Receive raw object of event data and update current Event
   * @param {object} data
   */
  updateEventData(data) {
    if (data.destination !== undefined) {
      this.destination = data.destination;
    }
    if (
      data.eventName !== undefined &&
      Event.EVENT_NAMES[data.eventName] !== undefined
    ) {
      this.eventName = data.eventName;
    }
    this.eventTime = data.eventTime;
  }

  /**
   * Method: updateEventNameFromEvent
   * Update specifically the eventName and the new eventTime
   * @param {Event} event
   */
  updateEventNameFromEvent(event) {
    if (!(event instanceof Event)) {
      return;
    }
    if (Event.EVENT_NAMES[event.eventName] === undefined) {
      console.log('Invalid eventName: ', event.eventName);
      return;
    }
    this.eventTime = event.eventTime;
    this.eventName = event.eventName;
  }

  /**
   * Method: getMongoJSON
   * method to get json data formatted for sending to mongo
   */
  getMongoJSON() {
    return {
      _id: this.id,
      destination: this.destination,
      eventName: this.eventName,
      name: this.name,
      eventTime: this.eventTime,
    };
  }

  /**
   * Method: toDisplayJSON
   * method to get json data formatted for sending to the client
   */
  toDisplayJSON() {
    return {
      id: this.id,
      destination: this.destination,
      eventName: this.eventName,
      name: this.name,
      eventTime: this.eventTime,
    };
  }

  /**
   * Method: sortEventList
   * Sort first by the priority of the state of the event. Earlier states prioritized over later states.
   * Sort next by the time of event. Oldest events should always be displayed first.
   *
   * @param {Event} event1
   * @param {Event} event2
   */
  static sortEventList(event1, event2) {
    return (
      Event.EVENT_PRIORITY.indexOf(event1.eventName) -
        Event.EVENT_PRIORITY.indexOf(event2.eventName) ||
      event1.eventTime - event2.eventTime
    );
  }
}

module.exports = Event;
