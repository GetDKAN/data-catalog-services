import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Resource from './index';

describe('<IconList />', () => {
  test('renders a default title', () => {
    render(<Resource />);
    console.log(screen)
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});