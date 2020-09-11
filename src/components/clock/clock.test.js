import React from 'react';
import { render, act } from '@testing-library/react';
import { configMap } from '../../engine.config';
import Clock from './clock.component';
import EventEngine from '../../libs/__mocks__/event-engine.lib';
const eventEngine = new EventEngine();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/active',
    useHistory: () => ({}),
  }),
}));

describe('<Clock/>', () => {
  describe('Clock label', () => {
    it('should exist', async () => {
      const promise = Promise.resolve(configMap.STOPPED);
      eventEngine.getState = jest.fn(() => promise);
      const { getByText } = render(
        <Clock eventEngine={eventEngine} currentPath="active" />
      );
      const clockLabel = getByText('Clock:');
      expect(clockLabel).toBeInTheDocument();
      expect(eventEngine.getState).toHaveBeenCalledTimes(1);
      await act(() => promise);
    });
  });
});
