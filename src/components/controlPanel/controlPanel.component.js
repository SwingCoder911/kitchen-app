import React, { useEffect, useState } from 'react';
import className from 'classnames';
import { configMap } from '../../engine.config';
import './controlPanel.scss';

/**
 * Component: ControlPanel
 * Handle all the functionality of running the event engine.
 * @param {eventEngine} eventEngine
 */
export default function ControlPanel({ eventEngine }) {
  let [engineState, setEngineState] = useState(configMap.STOPPED);
  let [error, setError] = useState(false);
  const onComplete = () => {
    setEngineState(configMap.COMPLETED);
  };
  const onBeginClicked = () => {
    eventEngine
      .begin()
      .then(() => {
        setEngineState(configMap.RUNNING);
      })
      .catch((error) => {
        console.log('Error beginning engine');
        setError(error);
      });
  };
  const onPauseClicked = () => {
    eventEngine
      .pause()
      .then(() => {
        setEngineState(configMap.PAUSED);
      })
      .catch((error) => {
        console.log('Error pausing engine');
        setError(error);
      });
  };
  const onContinueClicked = () => {
    eventEngine
      .continue()
      .then(() => {
        setEngineState(configMap.RUNNING);
      })
      .catch((error) => {
        console.log('Error continueing engine');
        setError(error);
      });
  };
  const onStopClicked = () => {
    eventEngine
      .stop()
      .then(() => {
        setEngineState(configMap.COMPLETED);
      })
      .catch((error) => {
        console.log('Error stopping engine');
        setError(error);
      });
  };
  const showCompleted = () => !error && engineState === configMap.COMPLETED;
  const showStart = () =>
    !error &&
    !showCompleted() &&
    engineState !== configMap.RUNNING &&
    engineState !== configMap.PAUSED;
  const showPause = () => !error && engineState === configMap.RUNNING;
  const showContinue = () => !error && engineState === configMap.PAUSED;
  const showStop = () =>
    !error &&
    (!showStart() || showPause() || showContinue()) &&
    engineState !== configMap.STOPPED &&
    !showCompleted();

  useEffect(() => {
    eventEngine.setOnComplete('control-panel', onComplete);
    eventEngine
      .getState()
      .then((state) => {
        setEngineState(state);
      })
      .catch((error) => {
        console.log('error getting state: ', error);
      });
  });
  return (
    <aside
      className={className({
        'control-panel': true,
        completed: showCompleted(),
      })}
    >
      {error ? <p className="error-message">{error}</p> : ''}
      {showCompleted() ? <p className="message">Completed</p> : ''}
      {showStart() ? (
        <button
          className="uk-button control-panel__button control-panel__button--begin"
          onClick={() => onBeginClicked()}
        >
          Begin
        </button>
      ) : (
        ''
      )}
      {showPause() ? (
        <button
          className="uk-button control-panel__button uk-button-default"
          onClick={() => onPauseClicked()}
        >
          Pause
        </button>
      ) : (
        ''
      )}
      {showContinue() ? (
        <button
          className="uk-button control-panel__button uk-button-default"
          onClick={() => onContinueClicked()}
        >
          Continue
        </button>
      ) : (
        ''
      )}
      {showStop() ? (
        <button
          className="uk-button control-panel__button control-panel__button--stop"
          onClick={() => onStopClicked()}
        >
          Quit
        </button>
      ) : (
        ''
      )}
    </aside>
  );
}
