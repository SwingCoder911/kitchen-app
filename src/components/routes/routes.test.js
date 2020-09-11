import React from 'react';
import { render, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Event from '../../models/event.model';
import tabs from '../../test/mocks/tabs.mock';
import Routes from './routes.component';
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

describe('<Routes/>', () => {
  it('should exist', async () => {
    const promise = Promise.resolve();
    tabs[0].getEvents = jest.fn(() => promise);
    const { container } = render(
      <Router>
        <Routes tabs={tabs} eventEngine={eventEngine} />
      </Router>
    );
    expect(container.tagName).toEqual('DIV');
    await act(() => promise);
  });
});
