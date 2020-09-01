module.exports = {
  singleMock: {
    destination: '801 Toyopa Dr, Pacific Palisades, CA 90272',
    event_name: 'CREATED',
    id: '4b76edbf',
    name: 'Cheese pizza',
    sent_at_second: 1,
  },
  basicMock: [
    {
      destination: '801 Toyopa Dr, Pacific Palisades, CA 90272',
      event_name: 'CREATED',
      id: '4b76edbf',
      name: 'Cheese pizza',
      sent_at_second: 1,
    },
    {
      destination: '801 Toyopa Dr, Pacific Palisades, CA 90272',
      event_name: 'COOKED',
      id: '4b76edbf',
      name: 'Cheese pizza',
      sent_at_second: 2,
    },
    {
      destination: '801 Toyopa Dr, Pacific Palisades, CA 90272',
      event_name: 'DRIVER_RECEIVED',
      id: '4b76edbf',
      name: 'Cheese pizza',
      sent_at_second: 3,
    },
  ],
  duplicatesMock: [
    {
      destination: '801 Toyopa Dr, Pacific Palisades, CA 90272',
      event_name: 'CREATED',
      id: '4b76edbf',
      name: 'Cheese pizza',
      sent_at_second: 1,
    },
    {
      destination: '801 Toyopa Dr, Pacific Palisades, CA 90272',
      event_name: 'COOKED',
      id: '4b76edbf',
      name: 'Cheese pizza',
      sent_at_second: 2,
    },
    {
      destination: '801 Toyopa Dr, Pacific Palisades, CA 90272',
      event_name: 'DRIVER_RECEIVED',
      id: '4b76edbf',
      name: 'Cheese pizza',
      sent_at_second: 2,
    },
  ],
};
