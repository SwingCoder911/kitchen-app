import React from 'react';
import { render, act } from '@testing-library/react';
import Event from '../../models/event.model';
import Nav from './nav.component';
import EventEngine from '../../libs/__mocks__/event-engine.lib';
import { basicMock } from '../../api/test/events.mock';
const eventEngine = new EventEngine();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/active',
    useHistory: () => ({}),
  }),
}));

describe('<Nav/>', () => {
  it('should exist', async () => {
    const { container } = render(<Nav tabs={[]} currentTab="active" />);
    expect(container.querySelector('.nav')).toBeTruthy();
  });
});
