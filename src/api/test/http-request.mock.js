const DEFAULT_VALUE = {};
module.exports = {
  mockRequest: (body = DEFAULT_VALUE, params = DEFAULT_VALUE) => {
    const res = {};
    req.body = jest.fn().mockReturnValue(body);
    req.params = jest.fn().mockReturnValue(params);
    return req;
  },

  mockResponse: (
    send = DEFAULT_VALUE,
    status = DEFAULT_VALUE,
    json = DEFAULT_VALUE
  ) => {
    const res = {};
    res.send = jest.fn().mockReturnValue(send);
    res.status = jest.fn().mockReturnValue({
      send: jest.fn().mockReturnValue(DEFAULT_VALUE),
    });
    res.json = jest.fn().mockReturnValue(json);
    return res;
  },
  mockNext: () => jest.fn(),
};
