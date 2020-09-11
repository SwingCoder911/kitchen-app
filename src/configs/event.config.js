/**
 * Events config file
 */
const CREATED = process.env.REACT_APP_STATE_CREATED;
const COOKED = process.env.REACT_APP_STATE_COOKED;
const DRIVER_RECEIVED = process.env.REACT_APP_STATE_DRIVER_RECEIVED;
const DELIVERED = process.env.REACT_APP_STATE_DELIVERED;
const CANCELLED = process.env.REACT_APP_STATE_CANCELLED;
module.exports = {
  configList: [CREATED, COOKED, DRIVER_RECEIVED, DELIVERED, CANCELLED],
  configMap: {
    [CREATED]: {
      key: CREATED,
      styleClass: 'pending',
      text: 'Cooking now',
    },
    [COOKED]: {
      key: COOKED,
      styleClass: 'pending',
      text: 'Just cooked',
    },
    [DRIVER_RECEIVED]: {
      key: DRIVER_RECEIVED,
      styleClass: 'pending',
      text: 'In Transit',
    },
    [DELIVERED]: {
      key: DELIVERED,
      styleClass: 'complete',
      text: 'Delivered',
    },
    [CANCELLED]: {
      key: CANCELLED,
      styleClass: 'cancelled',
      text: 'Cancelled',
    },
  },
};
