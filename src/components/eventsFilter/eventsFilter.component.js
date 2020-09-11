import React, { useState } from 'react';
import className from 'classnames';
import { eventNameConfig } from '../../libs/componentResources';
import './eventsFilter.scss';

/**
 * Component: EventsFilter
 * Component to handle filtering of events list.
 * Simply get filter object and pass it into "updateFilter" function
 * @param {function} updateFilter
 */
export default function EventsFilter({ updateFilter }) {
  let [createdFilter, setCreatedFilter] = useState(false);
  let [sinceCookedFilter, setSinceCookedFilter] = useState(false);
  let [sinceCooked, setSinceCooked] = useState(-1);
  const onCreatedFilterClicked = (e) => {
    setCreatedFilter(!createdFilter);
    updateFilter({
      isCreated: !createdFilter,
    });
  };
  const onSinceCookedFilterClicked = (e) => {
    if (e.target.tagName === 'INPUT' || sinceCooked === -1) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setSinceCookedFilter(!sinceCookedFilter);
    updateFilter({
      sinceCooked: !sinceCookedFilter === false ? false : sinceCooked,
    });
  };
  const onSinceCookedUpdated = (value) => {
    setSinceCooked(value);
  };
  const onSinceCookedFocused = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  const getCreatedFilterClass = () => {
    const createdFilterClasses = ['uk-button', 'filter-button'];
    if (createdFilter) {
      createdFilterClasses.push('uk-button-primary');
    } else {
      createdFilterClasses.push('uk-button-default');
    }
    return className(createdFilterClasses);
  };
  const getSinceCookedFilterClass = () => {
    const sinceCookedFilterClasses = ['uk-button', 'since-cooked'];
    if (sinceCookedFilter) {
      sinceCookedFilterClasses.push('uk-button-primary');
    } else {
      sinceCookedFilterClasses.push('uk-button-default');
    }
    return className(sinceCookedFilterClasses);
  };
  return (
    <form className="events-filter" onSubmit={(e) => onFormSubmit(e)}>
      <div className="events-filter__initial">
        <div className="filter-area">
          <button
            className={getCreatedFilterClass()}
            onClick={() => onCreatedFilterClicked()}
          >
            {eventNameConfig.CREATED.text}
          </button>
          <button
            className={getSinceCookedFilterClass()}
            onClick={(e) => onSinceCookedFilterClicked(e)}
          >
            <input
              className="uk-input since-cooked__value"
              type="number"
              onKeyUp={(e) => onSinceCookedUpdated(e.target.value)}
              onFocus={(e) => onSinceCookedFocused(e)}
            />
            since cooked
          </button>
        </div>
      </div>
    </form>
  );
}
