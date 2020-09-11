import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Events from '../events/events.component';

/**
 * Component: Routes
 * Handle route array for tabs
 * @param {[tab]} tabs
 * @param {eventEngine} eventEngine
 */
export default function Routes({ tabs, eventEngine }) {
  const defaultTab = tabs[0].key;
  return (
    <Switch>
      {tabs.map((tab, i) => (
        <Route path={`/${tab.key}`} key={i}>
          <Events
            eventEngine={eventEngine}
            getEvents={tab.getEvents}
            showFilters={tab.filtersEnabled}
          />
        </Route>
      ))}
      <Route path="/">
        <Redirect to={`/${defaultTab}`} />
      </Route>
    </Switch>
  );
}
