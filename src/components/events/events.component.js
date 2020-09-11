import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import className from 'classnames';
import EventService from '../../libs/event-service.lib';
import EventsFilter from '../events-filter/events-filter.component';
import EventForm from '../event-form/event-form.component';
import EventList from '../event-list/event-list.component';
import {
  compareEventLists,
  defaultFilters,
  getFilteredList,
} from '../../libs/component-resources.lib';
import { getCurrentPath } from '../../libs/utils.lib';

import './events.scss';

/**
 * Helper Component: EventsDisplay
 * Handle display of event list or "no events" text
 * @param {[Event]} events
 * @param {function} onEditEvent
 */
const EventsDisplay = ({ events, onEditEvent }) =>
  !events.length ? (
    <p className="empty-list">No events to show</p>
  ) : (
    <EventList events={events} onEditEvent={onEditEvent} />
  );

/**
 * Component: Events
 * Handle getting and showing of events including Filter
 *
 * @param {eventEngine} eventEngine
 * @param {function} getEvents
 * @param {boolean} showFilters
 */
export default function Events({ eventEngine, getEvents, showFilters }) {
  const currentPath = getCurrentPath(useLocation().pathname);
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [error, setError] = useState(false);
  const [editEnabled, setEditEnabled] = useState(false);
  const [currentEditableEvent, setCurrentEditableEvent] = useState(null);

  const updateFilter = (updatedFilter) => {
    setFilters({
      ...filters,
      ...updatedFilter,
    });
  };
  const onEditEvent = (event) => {
    setCurrentEditableEvent(event);
    setEditEnabled(true);
  };
  const onEditFormSubmit = async (form) => {
    try {
      const result = await EventService.updateEvent(form);
      eventEngine.eventsUpdated();
      setEditEnabled(false);
      return result;
    } catch (e) {
      setEditEnabled(false);
      throw new Error(e.message);
    }
  };
  const toggleEventForm = () => {
    setEditEnabled(!editEnabled);
  };
  useEffect(() => {
    const handleGetEvents = () => {
      getEvents()
        .then((newEvents) => {
          if (!compareEventLists(events, newEvents)) {
            setEvents(newEvents);
          }
        })
        .catch((e) => {
          if (e.message !== error) {
            setError(e.message);
          }
        });
    };
    eventEngine.setOnEventsSent(handleGetEvents);
    eventEngine.setOnEventUpdated(handleGetEvents);
    handleGetEvents();
  }, [getEvents, eventEngine, events, currentPath, error]);
  return (
    <div className={className({ events: true, 'with-filters': showFilters })}>
      {showFilters ? <EventsFilter updateFilter={updateFilter} /> : ''}
      {editEnabled ? (
        <EventForm
          title="Edit Event"
          submitText="Update"
          event={currentEditableEvent}
          onSubmit={onEditFormSubmit}
          toggleEventForm={toggleEventForm}
        ></EventForm>
      ) : (
        <div className="events-container">
          <EventsDisplay
            events={getFilteredList(events, filters, eventEngine.tick)}
            onEditEvent={onEditEvent}
          />
        </div>
      )}
    </div>
  );
}
