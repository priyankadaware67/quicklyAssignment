import React from 'react';
import { screen } from '@testing-library/react';
import Profile from './Profile';

test('renders Profile component', () => {
  const profileText = screen.getByText(/User Profile/i);
  expect(profileText).toBeInTheDocument();
});
