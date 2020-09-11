import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentPath } from '../../libs/utils.lib';
import Nav from '../nav/nav.component';
import ControlPanel from '../control-panel/control-panel.component';
import Clock from '../clock/clock.component';
import EventForm from '../event-form/event-form.component';
import Routes from '../routes/routes.component';
import EventService from '../../libs/event-service.lib';
import './app.scss';

const tabs = [
  {
    label: 'Active',
    key: 'active',
    filtersEnabled: true,
    getEvents: EventService.getEvents,
  },
  {
    label: 'Processed',
    key: 'processed',
    filtersEnabled: false,
    getEvents: EventService.getProcessedEvents,
  },
];
const defaultTab = tabs[0].key;
/**
 * Component: App
 * Root application that handles high level layout displays
 * @param {eventEngine} eventEngine
 */
function App({ eventEngine }) {
  const currentPath = getCurrentPath(useLocation().pathname);
  const [addFormActive, setAddFormActive] = useState(false);
  let currentTab = defaultTab;
  if (currentPath !== '') {
    currentTab = currentPath;
  }
  const onAddFormSubmit = async (form) => {
    try {
      const result = await EventService.createEvent(form);
      setAddFormActive(false);
      eventEngine.eventsUpdated();
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  };
  const toggleAddForm = () => {
    setAddFormActive(!addFormActive);
  };

  return (
    <div className="kitchen-app">
      <header className="kitchen-app__header">
        <Clock eventEngine={eventEngine} currentPath={currentPath} />
        <Nav tabs={tabs} currentTab={currentTab} />
        {!addFormActive ? (
          <button
            className="uk-button uk-button-primary add-button"
            onClick={() => toggleAddForm()}
          >
            <span data-uk-icon="icon: plus"></span>
            <span className="button-text">Add Event</span>
          </button>
        ) : (
          ''
        )}
      </header>
      {addFormActive ? (
        <EventForm
          title="New Event"
          submitText="Submit"
          onSubmit={onAddFormSubmit}
          toggleEventForm={toggleAddForm}
        ></EventForm>
      ) : (
        ''
      )}
      <section className="kitchen-app__internal">
        <Routes tabs={tabs} eventEngine={eventEngine} currentTab={currentTab} />
      </section>
      <footer className="kitchen-app__footer">
        <ControlPanel eventEngine={eventEngine} />
      </footer>
    </div>
  );
}
export default App;
