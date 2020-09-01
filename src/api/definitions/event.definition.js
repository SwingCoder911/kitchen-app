/**
 * Class: Event
 * This class is meant to define and handle all the event object operations
 */
class Event {
  static DEFAULT_OPTIONS = {
    fromExternal: false,
    fromMongo: false,
  };
  static EVENT_NAMES = {
    CREATED: 'CREATED',
    COOKED: 'COOKED',
    CANCELLED: 'CANCELLED',
    DRIVER_RECEIVED: 'DRIVER_RECEIVED',
    DELIVERED: 'DELIVERED',
  };
  static ACTIVE_EVENTS = [Event.EVENT_NAMES.CREATED, Event.EVENT_NAMES.COOKED];
  static COMPLETED_EVENTS = [
    Event.EVENT_NAMES.CANCELLED,
    Event.EVENT_NAMES.DELIVERED,
  ];
  constructor(data, options = Event.DEFAULT_OPTIONS) {
    const { fromExternal, fromMongo } = options;
    if (fromMongo) {
      this.id = data._id !== undefined ? data._id : '';
    } else {
      this.id = data.id !== undefined ? data.id : '';
    }
    this.destination = data.destination !== undefined ? data.destination : '';
    if (fromExternal) {
      this.eventName = data.event_name !== undefined ? data.event_name : '';
    } else {
      this.eventName = data.eventName !== undefined ? data.eventName : '';
    }
    this.name = data.name !== undefined ? data.name : '';
  }

  /**
   * Method: updateEventData
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
    if (data.name !== undefined) {
      this.name = data.name;
    }
  }

  /**
   * Method: updateEventNameFromEvent
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
    };
  }
}

module.exports = Event;
