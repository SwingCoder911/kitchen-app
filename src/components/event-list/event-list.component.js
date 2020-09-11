import React from 'react';
import className from 'classnames';
import { eventNameConfig } from '../../libs/component-resources.lib';
import './event-list.scss';

/**
 * Component: EventList
 * Handle only show list of events
 * @param {[Event]} events
 * @param {function} onEditEvent
 */
export default function EventList({ events, onEditEvent }) {
  if (!events.length) {
    return '';
  }
  const onEditClicked = (event) => {
    onEditEvent(event);
  };
  const getEventLabelClass = (event) => {
    const classConfig = ['event__label'];
    if (eventNameConfig[event.eventName] === undefined) {
      return classConfig;
    }
    classConfig.push(eventNameConfig[event.eventName].styleClass);
    return className(classConfig);
  };
  const getEventLabelText = (event) =>
    eventNameConfig[event.eventName] === undefined
      ? ''
      : eventNameConfig[event.eventName].text;

  return (
    <ul className="event-list">
      {events.map((event, idx) => (
        <li className="uk-card uk-card-default event" key={idx}>
          <div className="layout">
            <div className="layout__primary">
              <p className="uk-card-title event__title">
                {event.name} | {event.eventTime}
              </p>
              <button className="uk-button uk-button-link event__destination">
                {event.destination}
              </button>
            </div>
            <div className="layout__actions">
              <button
                data-uk-icon="icon: pencil"
                onClick={() => onEditClicked(event)}
              ></button>
            </div>
          </div>
          <p className={getEventLabelClass(event)}>
            {getEventLabelText(event)}
          </p>
        </li>
      ))}
    </ul>
  );
}
