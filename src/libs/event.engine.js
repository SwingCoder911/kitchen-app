import Event from '../models/event.model';
import API from './api';
const SocketIO = window.io || null;

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
    if (SocketIO === null) {
      console.log('Missing io library');
    }
    this.io = SocketIO(process.env.REACT_APP_SOCKET_ENDPOINT);
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
    this.io.on(EventEngine.SOCKET_EVENT_SENT, async (events) => {
      try {
        await this.sendEvents(
          events.map((event) => new Event(event, { fromExternal: true }))
        );
        this.onEventsSent();
      } catch (e) {
        console.log('Error sending events: ', e);
      }
    });
    this.io.on(EventEngine.SOCKET_EVENT_TICK, (tick) => {
      this.onTickUpdate(tick);
      this.tick = tick;
    });
    this.io.on(EventEngine.SOCKET_EVENT_COMPLETE, async (events) => {
      EventEngine.fireEngineEvents(this.onComplete);
      this.resetTick();
      this.onTickUpdate(this.tick);
    });
  }

  /**
   * Get state from server engine
   */
  async getState() {
    try {
      const response = await API.getEngineState();
      const { state } = await response.json();
      return state;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * Engine controls
   */
  async begin() {
    try {
      EventEngine.fireEngineEvents(this.onBegin);
      return await API.beginEngine();
    } catch (e) {
      throw new Error(e);
    }
  }
  async pause() {
    try {
      EventEngine.fireEngineEvents(this.onPause);
      return await API.pauseEngine();
    } catch (e) {
      throw new Error(e);
    }
  }
  async continue() {
    try {
      EventEngine.fireEngineEvents(this.onContinue);
      return await API.continueEngine();
    } catch (e) {
      throw new Error(e);
    }
  }
  async stop() {
    try {
      EventEngine.fireEngineEvents(this.onStop);
      return await API.stopEngine();
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * Send events to the server
   */
  async sendEvents(events) {
    try {
      return await API.queueEvents(events.map((event) => event.toJSON()));
    } catch (e) {
      throw new Error(e);
    }
  }
}
