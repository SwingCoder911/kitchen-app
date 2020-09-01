const EventsService = require('./events.service');
jest.mock('./database.service', () => {
  return jest.fn().mockImplementation(() => {
    return {};
  });
});
describe('EventsService', () => {
  it('should be constructed', () => {
    expect(new EventsService()).toBeInstanceOf(EventsService);
  });
});
