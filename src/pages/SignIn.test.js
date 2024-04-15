import React from 'react';
import { screen } from '@testing-library/react';
import SignIn from './SignIn';

test('renders SignIn component', () => {
  const signInText = screen.getByText(/SignIn/i);
  expect(signInText).toBeInTheDocument();
});
