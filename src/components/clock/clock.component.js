import React, { useEffect, useState } from 'react';
import { configDisplayMap } from '../../engine.config';
import './clock.scss';

/**
 * Component: Clock
 * Handle clock functionality
 * @param {eventEngine} eventEngine
 * @param {string} currentPath
 */
export default function Clock({ eventEngine, currentPath }) {
  const [tick, setTick] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [clockMessage, setClockMessage] = useState(
    configDisplayMap.STOPPED.text
  );

  const onBegin = () => {
    setLoading(true);
  };
  const onPause = () => {
    setClockMessage(configDisplayMap.PAUSED.text);
  };
  const onStop = () => {
    setClockMessage(configDisplayMap.STOPPED.text);
    setTick(-1);
  };
  const onComplete = () => {
    setClockMessage(configDisplayMap.COMPLETED.text);
    setTick(-1);
  };
  const getTimer = () => (tick < 0 ? clockMessage : tick);

  useEffect(() => {
    const onTickUpdate = (tickUpdate) => {
      setTick(tickUpdate);
      if (loading) {
        setLoading(false);
      }
    };
    eventEngine.setOnBegin('clock', onBegin);
    eventEngine.setOnPause('clock', onPause);
    eventEngine.setOnStop('clock', onStop);
    eventEngine.setOnComplete('clock', onComplete);
    eventEngine.setOnTickUpdate(onTickUpdate);
  }, [eventEngine, currentPath, loading]);

  useEffect(() => {
    eventEngine
      .getState()
      .then((state) => {
        setClockMessage(configDisplayMap[state].text);
      })
      .catch((error) => {
        console.log('error getting state: ', error);
      });
  }, [eventEngine, loading, tick]);

  return (
    <aside className="clock">
      <span className="uk-countdown-number label">Clock: </span>
      {loading ? (
        <span className="loading" data-uk-spinner="ratio: .75"></span>
      ) : (
        <span className="uk-countdown-number">{getTimer()}</span>
      )}
    </aside>
  );
}
