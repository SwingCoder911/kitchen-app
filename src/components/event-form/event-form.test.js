import React from 'react';
import { render, act } from '@testing-library/react';
import EventForm from './event-form.component';
import EventEngine from '../../libs/__mocks__/event-engine.lib';
const eventEngine = new EventEngine();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/active',
    useHistory: () => ({}),
  }),
}));

describe('<EventForm/>', () => {
  it('should exist', async () => {
    const { container } = render(
      <EventForm
        title="title"
        submitText="submitText"
        event={{}}
        onSubmit={jest.fn}
        toggleEventForm={jest.fn}
      />
    );
    expect(container.querySelector('.event-form-overlay')).toBeTruthy();
  });
});
