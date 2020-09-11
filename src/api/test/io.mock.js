const socket = require('./socket.mock');
module.exports = {
  on: jest.fn((event, fn) => {
    fn(socket);
  }),
  emit: jest.fn(),
};
