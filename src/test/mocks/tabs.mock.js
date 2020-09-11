export default [
  {
    label: 'Active',
    key: 'active',
    filtersEnabled: true,
    getEvents: jest.fn(() => Promise.resolve()),
  },
  {
    label: 'Processed',
    key: 'processed',
    filtersEnabled: false,
    getEvents: jest.fn(() => Promise.resolve()),
  },
];
