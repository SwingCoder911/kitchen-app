import Event from './event.model';
import { externalMock, singleMock } from '../test/mocks/events.mock';
import { configMap } from '../event.config';
describe('Event', () => {
  it('should construct', () => {
    const newEvent = new Event(singleMock);
    expect(newEvent).toBeInstanceOf(Event);
    expect(newEvent.id).toEqual(singleMock.id);
  });

  it('should construct with fromExternal', () => {
    const newEvent = new Event(externalMock, { fromExternal: true });
    expect(newEvent).toBeInstanceOf(Event);
    expect(newEvent.id).toEqual(singleMock.id);
  });

  describe('isEqualTo', () => {
    it('should be false when not compared to event', () => {
      const newEvent = new Event(singleMock);
      const falseEvent = {};
      expect(newEvent.isEqualTo(falseEvent)).toBe(false);
    });
    it('should be false when false', () => {
      const newEvent = new Event(singleMock);
      const falseEvent = new Event({ ...singleMock, name: 'old' });
      expect(newEvent.isEqualTo(falseEvent)).toBe(false);
    });
    it('should be false when true', () => {
      const newEvent = new Event(singleMock);
      const falseEvent = new Event({ ...singleMock, name: singleMock.name });
      expect(newEvent.isEqualTo(falseEvent)).toBe(true);
    });
  });

  describe('isCreated', () => {
    it('should be true when state is CREATED', () => {
      const newEvent = new Event({
        ...singleMock,
        eventName: configMap.CREATED.key,
      });
      expect(newEvent.isCreated()).toBe(true);
    });
    it('should be true when state is not CREATED', () => {
      const newEvent = new Event({
        ...singleMock,
        eventName: configMap.COOKED.key,
      });
      expect(newEvent.isCreated()).toBe(false);
    });
  });

  describe('isJustCooked', () => {
    it('should be true when state is COOKED', () => {
      const newEvent = new Event({
        ...singleMock,
        eventName: configMap.COOKED.key,
      });
      expect(newEvent.isJustCooked()).toBe(true);
    });
    it('should be true when state is not COOKED', () => {
      const newEvent = new Event({
        ...singleMock,
        eventName: configMap.CREATED.key,
      });
      expect(newEvent.isJustCooked()).toBe(false);
    });
  });

  describe('cookedSince', () => {
    it('should be false when eventName is not cooked', () => {
      const newEvent = new Event({
        ...singleMock,
        eventName: configMap.CREATED.key,
        eventTime: 1,
      });
      expect(newEvent.cookedSince(3, 3)).toBe(false);
    });
    it('should be true when eventName is cooked and tick - eventTime is less than value', () => {
      const newEvent = new Event({
        ...singleMock,
        eventName: configMap.COOKED.key,
        eventTime: 1,
      });
      expect(newEvent.cookedSince(3, 3)).toBe(true);
    });
    it('should be false when eventName is cooked and tick - eventTime is greater than value', () => {
      const newEvent = new Event({
        ...singleMock,
        eventName: configMap.COOKED.key,
        eventTime: 1,
      });
      expect(newEvent.cookedSince(5, 3)).toBe(false);
    });
    it('should be false when eventName is cooked and tick - eventTime equals value', () => {
      const newEvent = new Event({
        ...singleMock,
        eventName: configMap.COOKED.key,
        eventTime: 1,
      });
      expect(newEvent.cookedSince(5, 4)).toBe(true);
    });
  });
});
