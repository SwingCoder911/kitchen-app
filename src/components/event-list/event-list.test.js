import React from 'react';
import { render, act } from '@testing-library/react';
import Event from '../../models/event.model';
import EventList from './event-list.component';
import { basicMock } from '../../api/test/events.mock';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/active',
    useHistory: () => ({}),
  }),
}));

describe('<EventList/>', () => {
  it('should return blank div on no results', async () => {
    const { container } = render(
      <EventList events={[]} onEditEvent={jest.fn} />
    );
    expect(container.tagName).toEqual('DIV');
  });
  it('should exist', async () => {
    const { container } = render(
      <EventList
        events={basicMock.map(
          (mock) => new Event(mock, { fromExternal: true })
        )}
        onEditEvent={jest.fn}
      />
    );
    expect(container.querySelector('.event-list')).toBeTruthy();
  });
});
