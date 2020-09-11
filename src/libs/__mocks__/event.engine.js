/**
 * Class: EventEngine
 * Client side event engine handler
 * Handles sockets, and event firing
 */
export default class EventEngine {
  static SOCKET_EVENT_SENT = process.env.REACT_APP_SOCKET_EVENT_SENT;
  static SOCKET_EVENT_COMPLETE = process.env.REACT_APP_SOCKET_EVENT_COMPLETE;
  static SOCKET_EVENT_TICK = process.env.REACT_APP_SOCKET_EVENT_TICK;
  static fireEngineEvents(events) {
    Object.values(events).forEach((callback) => callback());
  }
  constructor() {
    this.io = {
      on: jest.fn(),
    };
    this.tick = -1;
    this.onEventsSent = null;
    this.onComplete = {};
    this.onPause = {};
    this.onContinue = {};
    this.onStop = {};
    this.onBegin = {};
    this.onEventUpdated = {};
    this.onTickUpdate = null;
  }
  /**
   * Engine event setters
   */
  setOnBegin(key, onBegin) {
    this.onBegin[key] = onBegin;
  }
  setOnPause(key, onPause) {
    this.onPause[key] = onPause;
  }
  setOnContinue(key, onContinue) {
    this.onContinue[key] = onContinue;
  }
  setOnStop(key, onStop) {
    this.onStop[key] = onStop;
  }
  setOnComplete(key, onComplete) {
    this.onComplete[key] = onComplete;
  }
  /**
   * Engine Event event setters
   */
  setOnEventsSent(onEventsSent) {
    this.onEventsSent = onEventsSent;
  }
  setOnTickUpdate(onTickUpdate) {
    this.onTickUpdate = onTickUpdate;
  }
  setOnEventUpdated(onEventUpdated) {
    this.onEventUpdated = onEventUpdated;
  }
  /**
   * Event engine methods
   */
  resetTick() {
    this.tick = -1;
  }
  eventsUpdated() {
    this.onEventUpdated();
  }
  init() {
    this.io.on(EventEngine.SOCKET_EVENT_SENT, jest.fn);
    this.io.on(EventEngine.SOCKET_EVENT_TICK, jest.fn);
    this.io.on(EventEngine.SOCKET_EVENT_COMPLETE, jest.fn);
  }

  /**
   * Get state from server engine
   */
  async getState() {
    return Promise.resolve('RUNNING');
  }

  /**
   * Engine controls
   */
  async begin() {}
  async pause() {}
  async continue() {}
  async stop() {}

  /**
   * Send events to the server
   */
  async sendEvents(events) {}
}
