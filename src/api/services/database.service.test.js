const DatabaseService = require('./database.service');
const ioMock = require('../test/io.mock');
const { basicMock, duplicatesMock } = require('../test/events.mock');
/**
 * Reset each jest faker and mock before each test
 */
beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});
describe('DatabaseService', () => {
  it('should construct', () => {
    const newService = new DatabaseService(ioMock);
    expect(newService).toBeInstanceOf(DatabaseService);
  });
});
