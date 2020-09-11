import React from 'react';
import { render, act } from '@testing-library/react';
import Event from '../../models/event.model';
import EventsFilter from './events-filter.component';
import EventEngine from '../../libs/__mocks__/event-engine.lib';
import { basicMock } from '../../api/test/events.mock';
const eventEngine = new EventEngine();
// console.log('found eventEngine: ', eventEngine);
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/active',
    useHistory: () => ({}),
  }),
}));

describe('<EventsFilter/>', () => {
  it('should exist', async () => {
    const { container } = render(<EventsFilter updateFilter={jest.fn} />);
    expect(container.querySelector('.events-filter')).toBeTruthy();
  });
});
