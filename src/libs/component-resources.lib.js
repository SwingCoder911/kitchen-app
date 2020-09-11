/**
 * Set of shared resources for components
 */
import { configMap, configList } from '../configs/event.config';
export const eventNameConfig = configList.reduce((acc, eventName) => {
  acc[eventName] = {
    styleClass: configMap[eventName].styleClass,
    text: configMap[eventName].text,
  };
  return acc;
}, {});

export const defaultFilters = {
  isCreated: false,
  sinceCooked: false,
};

export const defaultEventForm = {
  name: '',
  eventName: configMap.CREATED.key,
  destination: '',
};

export const eventMatchesFilter = (event, filters, tick) => {
  const keys = Object.keys(filters);
  for (let i = 0, len = keys.length; i < len; i += 1) {
    const curr = keys[i];
    if (curr === 'isCreated' && filters[curr]) {
      if (!event.isCreated()) {
        return false;
      }
    } else if (curr === 'sinceCooked' && filters[curr] !== false) {
      if (!event.cookedSince(tick, filters[curr])) {
        return false;
      }
    }
  }
  return true;
};

export const getFilteredList = (eventList, filters, tick) =>
  eventList.filter((event) => eventMatchesFilter(event, filters, tick));

export function compareEventLists(list1, list2) {
  if (list1.length !== list2.length) {
    return false;
  }
  for (let i = 0, len = list1.length; i < len; i += 1) {
    const currentEvent = list1[i];
    if (!currentEvent.isEqualTo(list2[i])) {
      return false;
    }
  }
  return true;
}
