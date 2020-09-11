import React from 'react';
import { render, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { configMap } from '../../configs/engine.config';
import App from './app.component';
import EventEngine from '../../libs/__mocks__/event-engine.lib';
const eventEngine = new EventEngine();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/active',
    useHistory: () => ({}),
  }),
}));

describe('<App/>', () => {
  describe('Add event button', () => {
    it('should exist', async () => {
      const promise = Promise.resolve(configMap.STOPPED);
      eventEngine.getState = jest.fn(() => promise);
      const { getByText } = render(
        <Router>
          <App eventEngine={eventEngine} />
        </Router>
      );
      const addButton = getByText('Add Event');
      expect(addButton).toBeInTheDocument();
      await act(() => promise);
    });
  });
});
