const getFileData = require('../utils/getFileData');
const { configMap } = require('../../engine.config');

/**
 * Class: EventEngineService
 * This service is meant to contain the functionality of processing all the challenge json data and sending each of the events
 * at the appropriate time, according to the "sent_at_second" field, to the client
 */
class EventEngineService {
  static SOCKET_EVENT_SENT = process.env.REACT_APP_SOCKET_EVENT_SENT;
  static SOCKET_EVENT_COMPLETE = process.env.REACT_APP_SOCKET_EVENT_COMPLETE;
  static SOCKET_EVENT_TICK = process.env.REACT_APP_SOCKET_EVENT_TICK;
  static ENGINE_STATES = configMap;
  constructor(io) {
    // IO Socket Service
    this.io = io;
    this.socket = null;
    // Event map: {[sent_at_second]: [event]}
    this.eventMap = {};
    // The value of the last event in the event map
    this.lastEvent = -1;
    this.eventIntervalTicker = null;
    this.state = EventEngineService.ENGINE_STATES.STOPPED;
  }

  /**
   * Method: init
   * Initial method to run and get all the file data, then setup the socket connections once gathered
   */
  init() {
    return new Promise((res, rej) => {
      getFileData()
        .then((jsonData) => {
          this.initEvents(jsonData);
          this.io.on('connection', (socket) => {
            this.socket = socket;
            console.log('Socket connection established');
            this.socket.on('disconnect', () => {
              console.log('Socket disconnected');
            });
            res();
          });
        })
        .catch((e) => {
          rej(e.message);
        });
    });
  }

  /**
   * Method: getState
   * Get Current state of the engine
   */
  getState() {
    return this.state;
  }

  /**
   * Method: pause
   * Put the engine in a pause state only if the engine is currently running
   */
  pause() {
    if (this.state === EventEngineService.ENGINE_STATES.RUNNING) {
      this.state = EventEngineService.ENGINE_STATES.PAUSED;
    }
  }

  /**
   * Method: continue
   * Continue the engine only if the engine is currently paused
   */
  continue() {
    if (this.state === EventEngineService.ENGINE_STATES.PAUSED) {
      this.state = EventEngineService.ENGINE_STATES.RUNNING;
    }
  }

  /**
   * Method: stop
   * Completely stop the engine. Engine is not setup to restart
   */
  stop() {
    this.state = EventEngineService.ENGINE_STATES.COMPLETED;
    this.socket.emit(EventEngineService.SOCKET_COMPLETE_NAME);
    clearInterval(this.eventIntervalTicker);
    this.eventIntervalTicker = null;
  }

  /**
   * Function: initEvents
   * Take the raw event json data and store it in the local eventMap
   * Calculate the last event second.
   * @param {[object]} jsonData
   */
  initEvents(jsonData) {
    this.eventMap = jsonData.reduce((acc, curr) => {
      if (acc[curr.sent_at_second] === undefined) {
        acc[curr.sent_at_second] = [curr];
        if (curr.sent_at_second > this.lastEvent) {
          this.lastEvent = curr.sent_at_second;
        }
      } else {
        acc[curr.sent_at_second].push(curr);
      }
      return acc;
    }, {});
  }

  /**
   * Method: runEventEngine
   * Setup the engine mechanics: setInterval, state update, emitters
   */
  runEventEngine() {
    this.state = EventEngineService.ENGINE_STATES.RUNNING;
    let i = 0;
    if (this.lastEvent === -1) {
      return;
    }
    this.eventIntervalTicker = setInterval(() => {
      if (this.state === EventEngineService.ENGINE_STATES.PAUSED) {
        return;
      }
      if (this.socket === null) {
        console.log('No socket to use');
        return;
      }
      if (i > this.lastEvent) {
        console.log('Completed processing all events');
        this.socket.emit(EventEngineService.SOCKET_EVENT_COMPLETE);
        this.state = EventEngineService.ENGINE_STATES.COMPLETED;
        clearInterval(this.eventIntervalTicker);
        i = 0;
        return;
      }
      if (this.eventMap[i] !== undefined) {
        this.socket.emit(
          EventEngineService.SOCKET_EVENT_SENT,
          this.eventMap[i]
        );
      }
      this.socket.emit(EventEngineService.SOCKET_EVENT_TICK, i);
      i += 1;
    }, 1000);
  }
}

module.exports = EventEngineService;
