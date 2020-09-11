import React from 'react';
import { render } from '@testing-library/react';
import Nav from './nav.component';

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
