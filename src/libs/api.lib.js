/**
 * Class: API
 * This class's sole intention is to abstract the actual api calls for services
 */
export default class API {
  static async beginEngine() {
    try {
      return await fetch('/api/events-engine/');
    } catch (e) {
      throw new Error(e.message);
    }
  }
  static async getEngineState() {
    try {
      return await fetch('/api/events-engine/state');
    } catch (e) {
      throw new Error(e.message);
    }
  }
  static async pauseEngine() {
    try {
      return await fetch('/api/events-engine/pause');
    } catch (e) {
      throw new Error(e.message);
    }
  }
  static async continueEngine() {
    try {
      return await fetch('/api/events-engine/continue');
    } catch (e) {
      throw new Error(e.message);
    }
  }
  static async stopEngine() {
    try {
      return await fetch('/api/events-engine/stop');
    } catch (e) {
      throw new Error(e.message);
    }
  }
  static async queueEvents(events) {
    try {
      return await fetch('/api/events/', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ events }),
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }
  static async getActiveEvents() {
    try {
      const response = await fetch('/api/events/');
      if (response.status === 404) {
        return [];
      }
      return response.json();
    } catch (e) {
      throw new Error(e.message);
    }
  }
  static async getProcessedEvents() {
    try {
      const response = await fetch('/api/events/processed');
      if (response.status === 404) {
        return [];
      }
      return response.json();
    } catch (e) {
      throw new Error(e.message);
    }
  }
  static async createEvent(event) {
    try {
      return await fetch('/api/events/create', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(event),
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }
  static async updateEvent(event) {
    try {
      return await fetch(`/api/events/${event.id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(event),
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
