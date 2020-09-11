import React, { useState } from 'react';
import {
  eventNameConfig,
  defaultEventForm,
} from '../../libs/component-resources.lib';
import './event-form.scss';

/**
 * Component: EventForm
 * Handle all the functionality around providing the event form display and functionality
 * @param {string} title
 * @param {string} submitText
 * @param {event} event
 * @param {function} onSubmit
 * @param {function} toggleEventForm
 */
export default function EventForm({
  title,
  submitText,
  event,
  onSubmit,
  toggleEventForm,
}) {
  const [eventForm, setEventForm] = useState(event ? event : defaultEventForm);
  const [loading, setLoading] = useState(false);
  const onSubmitClicked = (e) => {
    e.preventDefault();
    setLoading(true);
    onSubmit(eventForm)
      .then(() => {})
      .catch((e) => {
        console.log('EventForm error: ', e);
      });
  };

  const onEventNameUpdate = (value) => {
    setEventForm({
      ...eventForm,
      eventName: value,
    });
  };
  const onNameUpdate = (value) => {
    setEventForm({
      ...eventForm,
      name: value,
    });
  };
  const onDestinationUpdate = (value) => {
    setEventForm({
      ...eventForm,
      destination: value,
    });
  };
  const getEventNames = () =>
    Object.keys(eventNameConfig).map((eventKey) => ({
      text: eventNameConfig[eventKey].text,
      value: eventKey,
    }));
  const canSubmitForm = () =>
    eventForm.eventName !== '' &&
    eventForm.name !== '' &&
    eventForm.destination !== '';
  return (
    <div className="event-form-overlay">
      <button
        className="uk-button uk-button-primary close-button"
        onClick={() => toggleEventForm()}
      >
        <span data-uk-icon="icon: close"></span>
      </button>
      <form className="event-form" onSubmit={(e) => onSubmitClicked(e)}>
        <fieldset className="uk-fieldset">
          <legend className="uk-legend">{title}</legend>
          <div className="event-form__row">
            <input
              className="uk-input"
              type="text"
              placeholder="Event name"
              onKeyUp={(e) => onNameUpdate(e.target.value)}
              disabled={loading}
              defaultValue={eventForm.name}
            />
          </div>
          <div className="event-form__row">
            <select
              className="uk-select"
              defaultValue={eventForm.eventName}
              onChange={(e) => onEventNameUpdate(e.target.value)}
              disabled={loading}
            >
              {getEventNames().map((eventObject, idx) => (
                <option value={eventObject.value} key={idx}>
                  {eventObject.text}
                </option>
              ))}
            </select>
          </div>
          <div className="event-form__row">
            <input
              className="uk-input"
              type="text"
              placeholder="Event destination"
              onKeyUp={(e) => onDestinationUpdate(e.target.value)}
              defaultValue={eventForm.destination}
              disabled={loading}
            />
          </div>
          <div className="event-form__row">
            <button
              className="uk-button uk-button-default submit-button"
              type="submit"
              disabled={loading || !canSubmitForm()}
            >
              {loading ? (
                <span className="loading" data-uk-spinner="ratio: 1"></span>
              ) : (
                submitText
              )}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
