import React from 'react';
import { render } from '@testing-library/react';
import EventsFilter from './events-filter.component';

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
