import React from 'react';
import { render, act } from '@testing-library/react';
import Events from './events.component';
import EventEngine from '../../libs/__mocks__/event.engine';
const eventEngine = new EventEngine();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/active',
    useHistory: () => ({}),
  }),
}));

describe('<Events/>', () => {
  it('should exist', async () => {
    const promise = Promise.resolve();
    const getEventsFn = jest.fn(() => promise);
    const { container } = render(
      <Events
        getEvents={getEventsFn}
        showFilters={true}
        eventEngine={eventEngine}
      />
    );
    expect(container.querySelector('.events')).toBeTruthy();
    expect(getEventsFn).toHaveBeenCalledTimes(1);
    await act(() => promise);
  });
});
