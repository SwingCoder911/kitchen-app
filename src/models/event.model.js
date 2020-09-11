import { configMap } from '../event.config';
/**
 * Class: Event
 * Client side event model
 * This should handle all event operations on the client side
 */
export default class Event {
  static DEFAULT_OPTIONS = {
    fromExternal: false,
  };
  constructor(data, options = Event.DEFAULT_OPTIONS) {
    this.id = data.id === undefined ? null : data.id;
    this.name = data.name === undefined ? null : data.name;
    this.eventTime = data.eventTime === undefined ? -1 : data.eventTime;
    if (options.fromExternal) {
      this.eventName = data.event_name === undefined ? null : data.event_name;
      this.eventTime =
        data.sent_at_second === undefined ? -1 : data.sent_at_second;
    } else {
      this.eventName = data.eventName === undefined ? null : data.eventName;
      this.eventTime = data.eventTime;
    }
    this.destination = data.destination === undefined ? null : data.destination;
  }

  /**
   * Method: isEqualTo
   * Check to see whether current event is equal to existing event
   * @param {Event} event
   */
  isEqualTo(event) {
    if (!(event instanceof Event)) {
      return false;
    }
    if (this.id !== event.id) {
      return false;
    }
    if (this.name !== event.name) {
      return false;
    }
    if (this.eventName !== event.eventName) {
      return false;
    }

    if (this.destination !== event.destination) {
      return false;
    }
    return true;
  }

  isCreated() {
    return this.eventName === configMap.CREATED.key;
  }

  isJustCooked() {
    return this.eventName === configMap.COOKED.key;
  }

  /**
   * Method: cookedSince
   * This method returns true if the event is in "cooked" state and if the item was cooked within the last 'value' seconds
   * @param {num} tick
   * @param {num} value
   */
  cookedSince(tick, value) {
    if (this.eventTime === -1 || !this.isJustCooked()) {
      return false;
    }
    return value >= tick - this.eventTime;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      eventName: this.eventName,
      destination: this.destination,
      eventTime: this.eventTime,
    };
  }
}
