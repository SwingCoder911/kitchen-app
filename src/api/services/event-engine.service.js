const getFileData = require('../utils/getFileData');

/**
 * Class: EventEngineService
 * This service is meant to contain the functionality of processing all the challenge json data and sending each of the events
 * at the appropriate time, according to the "sent_at_second" field, to the client
 */
class EventEngineService {
  static SOCKET_EVENT_NAME = 'sent_at_second';
  constructor(io) {
    // IO Socket Service
    this.io = io;
    // Event map: {[sent_at_second]: [event]}
    this.eventMap = {};
    // The value of the last event in the event map
    this.lastEvent = -1;
  }
  init() {
    return new Promise((res, rej) => {
      this.io.on('connection', (socket) => {
        console.log('Socket connection established');
        res();
      });
    });
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
  runEventEngine() {
    let i = 0;
    if (this.lastEvent === -1) {
      return;
    }
    const eventsInterval = setInterval(() => {
      if (i > this.lastEvent) {
        clearInterval(eventsInterval);
        return;
      }
      if (this.eventMap[i] !== undefined) {
        this.io.emit(EventEngineService.SOCKET_EVENT_NAME, this.eventMap[i]);
      }
      i += 1;
    }, 1000);
  }
  async processEvents() {
    try {
      const jsonData = await getFileData();
      this.initEvents(jsonData);
      this.runEventEngine();
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = EventEngineService;
