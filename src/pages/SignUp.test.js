import React from 'react';
import { screen } from '@testing-library/react';
import SignUp from './SignUp';

test('renders SignUp component', () => {
  // const { getByText } = render(<SignUp />);
  const signUpText = screen.getByText(/SignUp/i);
  expect(signUpText).toBeInTheDocument();
});
