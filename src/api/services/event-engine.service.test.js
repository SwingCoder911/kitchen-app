const EventEngineService = require('./event-engine.service');
const ioMock = require('../test/io.mock');
const { basicMock, duplicatesMock } = require('../test/events.mock');

/**
 * Function: getHighestSend
 * function to simply get the highest value of sent_at_second in a series of events
 * @param {[event]} events
 */
const getHighestSend = (events) =>
  events.reduce((acc, curr) => {
    if (curr.sent_at_second > acc) {
      return curr.sent_at_second;
    }
    return acc;
  }, -1);

/**
 * Reset each jest faker and mock before each test
 */
beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});
describe('EventEngineService', () => {
  it('should construct', async () => {
    const newService = new EventEngineService(ioMock);
    expect(newService).toBeInstanceOf(EventEngineService);
  });
  describe('init', () => {
    it('construct should set a listener on socket connection', () => {
      let onCalled = false;
      const newService = new EventEngineService({
        ...ioMock,
        on: (event, callback) => {
          onCalled = event === 'connection';
        },
      });
      newService.init();
      expect(onCalled).toBeTruthy();
    });
  });
  describe('initEvents', () => {
    it('should fill eventsMap', () => {
      const newService = new EventEngineService(ioMock);
      newService.initEvents(basicMock);
      expect(Object.keys(newService.eventMap).length).toEqual(basicMock.length);
    });
    it('should fill eventsMap respecting duplicates', () => {
      const newService = new EventEngineService(ioMock);
      const uniqueList = duplicatesMock.reduce((acc, curr) => {
        if (acc.indexOf(curr.sent_at_second) === -1) {
          acc.push(curr.sent_at_second);
        }
        return acc;
      }, []);
      newService.initEvents(duplicatesMock);
      expect(uniqueList.length).toEqual(
        Object.keys(newService.eventMap).length
      );
    });
    it('should set lastEvent to be the highest sent_at_second value', () => {
      const newService = new EventEngineService(ioMock);
      const highest = getHighestSend(basicMock);
      newService.initEvents(basicMock);
      expect(newService.lastEvent).toEqual(highest);
    });
    it('should set lastEvent to be the highest sent_at_second value respecting duplicates', () => {
      const newService = new EventEngineService(ioMock);
      const highest = getHighestSend(duplicatesMock);
      newService.initEvents(duplicatesMock);
      expect(newService.lastEvent).toEqual(highest);
    });
  });

  describe('getState', () => {
    // TODO: Implement this
  });

  describe('runEventEngine', () => {
    const basicHighest = getHighestSend(basicMock);
    const duplicatesHighest = getHighestSend(duplicatesMock);

    it(`should have called io.emit ${basicHighest} times`, async () => {
      const newService = new EventEngineService(ioMock);
      newService.initEvents(basicMock);
      newService.runEventEngine();
      jest.advanceTimersByTime(4000);
      expect(ioMock.emit).toHaveBeenCalledTimes(basicHighest);
    });

    it(`should have called io.emit ${duplicatesHighest} times with duplicates`, async () => {
      const newService = new EventEngineService(ioMock);
      newService.initEvents(duplicatesMock);
      newService.runEventEngine();
      jest.advanceTimersByTime(4000);
      expect(ioMock.emit).toHaveBeenCalledTimes(duplicatesHighest);
    });
  });
});
