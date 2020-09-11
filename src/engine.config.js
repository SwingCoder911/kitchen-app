/**
 * Event Engine config file
 */
const RUNNING = process.env.REACT_APP_STATE_RUNNING;
const STOPPED = process.env.REACT_APP_STATE_STOPPED;
const PAUSED = process.env.REACT_APP_STATE_PAUSED;
const COMPLETED = process.env.REACT_APP_STATE_COMPLETED;
module.exports = {
  configList: [STOPPED, RUNNING, PAUSED, COMPLETED],
  configMap: {
    [STOPPED]: STOPPED,
    [RUNNING]: RUNNING,
    [PAUSED]: PAUSED,
    [COMPLETED]: COMPLETED,
  },
  configDisplayMap: {
    [STOPPED]: {
      key: STOPPED,
      text: 'Stopped',
    },
    [RUNNING]: {
      key: RUNNING,
      text: 'Running',
    },
    [PAUSED]: {
      key: PAUSED,
      text: 'Paused',
    },
    [COMPLETED]: {
      key: COMPLETED,
      text: 'Completed',
    },
  },
};
