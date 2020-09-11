module.exports = {
  externalMock: {
    destination: '801 Toyopa Dr, Pacific Palisades, CA 90272',
    event_name: 'CREATED',
    id: '4b76edbf',
    name: 'Cheese pizza',
    sent_at_second: 1,
  },
  singleMock: {
    destination: '801 Toyopa Dr, Pacific Palisades, CA 90272',
    eventName: 'CREATED',
    id: '4b76edbf',
    name: 'Cheese pizza',
    eventTime: 1,
  },
  basicMock: [
    {
      destination: '801 Toyopa Dr, Pacific Palisades, CA 90272',
      eventNme: 'CREATED',
      id: '4b76edbf',
      name: 'Cheese pizza',
      eventTime: 1,
    },
    {
      destination: '801 Toyopa Dr, Pacific Palisades, CA 90272',
      eventName: 'COOKED',
      id: '4b76edbf',
      name: 'Cheese pizza',
      eventTime: 2,
    },
    {
      destination: '801 Toyopa Dr, Pacific Palisades, CA 90272',
      eventName: 'DRIVER_RECEIVED',
      id: '4b76edbf',
      name: 'Cheese pizza',
      eventTime: 3,
    },
  ],
  duplicatesMock: [
    {
      destination: '801 Toyopa Dr, Pacific Palisades, CA 90272',
      eventName: 'CREATED',
      id: '4b76edbf',
      name: 'Cheese pizza',
      eventTime: 1,
    },
    {
      destination: '801 Toyopa Dr, Pacific Palisades, CA 90272',
      eventName: 'COOKED',
      id: '4b76edbf',
      name: 'Cheese pizza',
      eventTime: 2,
    },
    {
      destination: '801 Toyopa Dr, Pacific Palisades, CA 90272',
      eventName: 'DRIVER_RECEIVED',
      id: '4b76edbf',
      name: 'Cheese pizza',
      eventTime: 2,
    },
  ],
};
