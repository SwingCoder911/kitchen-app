const Event = require('./event.definition');
const { singleMock } = require('../test/events.mock');
const assertEvent = require('../test/assert-event');
describe('Event', () => {
  it('should construct', () => {
    const newEvent = new Event(singleMock);
    expect(newEvent).toBeInstanceOf(Event);
  });

  it('should construct with fromMongo', () => {
    const newEvent = new Event(
      {
        _id: singleMock.id,
        name: singleMock.name,
        destination: singleMock.destination,
        eventName: singleMock.event_name,
      },
      { fromMongo: true }
    );
    expect(newEvent).toBeInstanceOf(Event);
    expect(newEvent.id).toEqual(singleMock.id);
  });

  describe('updateEventData', () => {
    it('should update all fields appropriately', () => {
      const updateable = {
        eventName: Event.EVENT_NAMES.CANCELLED,
        destination: 'destination',
        name: 'name',
        eventTime: 0,
      };
      const newEvent = new Event(singleMock);
      newEvent.updateEventData(updateable);
      assertEvent(newEvent, { ...singleMock, ...updateable });
    });

    it('should ignore update of erroneous fields', () => {
      const updateable = {
        badField: 'test',
      };
      const newEvent = new Event(singleMock);
      newEvent.updateEventData(updateable);
      expect(newEvent.badField).toEqual(undefined);
    });
  });
  describe('updateEventNameFromEvent', () => {
    Object.values(Event.EVENT_NAMES).forEach((eventName) => {
      it(`should update to standard value ${eventName}`, () => {
        const updateable = new Event({
          ...singleMock,
          eventName,
          eventTime: singleMock.sent_at_second,
        });
        const newEvent = new Event({
          ...singleMock,
          eventName: singleMock.event_name,
        });
        expect(newEvent.eventName).toEqual(singleMock.event_name);
        newEvent.updateEventNameFromEvent(updateable);
        expect(newEvent.eventName).toEqual(eventName);
      });
    });
  });
  describe('getMongoJSON', () => {
    it('should return id as _id', () => {
      const newEvent = new Event(singleMock);
      const mongoedJSON = newEvent.getMongoJSON();
      expect(mongoedJSON._id).toEqual(newEvent.id);
    });
  });
  describe('toDisplayJSON', () => {
    it('should return id as id', () => {
      const newEvent = new Event(singleMock);
      const mongoedJSON = newEvent.toDisplayJSON();
      expect(mongoedJSON.id).toEqual(newEvent.id);
    });
  });
});
