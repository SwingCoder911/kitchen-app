const HttpHandler = require('./http.handler');
const Event = require('../definitions/event.definition');
const { singleMock, basicMock } = require('../test/events.mock');
const assertEvent = require('../test/assert-event');
const { mockResponse } = require('../test/http-request.mock');
describe('HttpHandler', () => {
  describe('error', () => {
    it('should set response status to 500', () => {
      const res = mockResponse();
      HttpHandler.error(res, { message: 'test' });
      expect(res.status).toHaveBeenCalledWith(HttpHandler.CODES.SERVER_ERROR);
    });
  });
  describe('noResults', () => {
    it('should set response status to 404', () => {
      const res = mockResponse();
      HttpHandler.noResults(res, 'test');
      expect(res.status).toHaveBeenCalledWith(HttpHandler.CODES.NOT_FOUND);
    });
  });
  describe('success', () => {
    it('should set response status to 200', () => {
      let setValue;
      const res = {
        ...mockResponse(),
        send: (value) => {
          setValue = value;
        },
      };
      HttpHandler.success(res);
      expect(setValue).toEqual('success');
    });
  });
  describe('sendResultList', () => {
    it('should set response status to 200', () => {
      let sent;
      const res = {
        ...mockResponse(),
        send: (value) => {
          sent = value;
        },
      };
      HttpHandler.sendResultList(
        res,
        basicMock.map((event) => new Event(event))
      );
      expect(sent.length).toEqual(basicMock.length);
    });
  });
  describe('sendResultObject', () => {
    it('should set response status to 200', () => {
      let sent;
      const res = {
        ...mockResponse(),
        send: (value) => {
          sent = value;
        },
      };
      const newEvent = new Event(singleMock);
      HttpHandler.sendResultObject(res, new Event(singleMock));
      assertEvent(newEvent, sent);
    });
  });
});
