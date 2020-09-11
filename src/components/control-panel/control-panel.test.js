import React from 'react';
import { render, act } from '@testing-library/react';
import ControlPanel from './control-panel.component';
import EventEngine from '../../libs/__mocks__/event-engine.lib';
const eventEngine = new EventEngine();
// console.log('found eventEngine: ', eventEngine);
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/active',
    useHistory: () => ({}),
  }),
}));

describe('<ControlPanel/>', () => {
  it('should exist', async () => {
    const promise = Promise.resolve();
    eventEngine.getState = jest.fn(() => promise);
    const { container } = render(<ControlPanel eventEngine={eventEngine} />);
    expect(container.querySelector('.control-panel')).toBeTruthy();
    expect(eventEngine.getState).toHaveBeenCalledTimes(1);
    await act(() => promise);
  });
});
