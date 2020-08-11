import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Publishers from './index';

describe('<Publishers />', () => {
  test('Displays Publisher page with Publisher list component', () => {
    render(
      <Publishers
        title="My Title"
        configContainer="dc-publisher"
        orgs={[
          {
            "identifier": "1",
            "name": "State Economic Council",
            "description": "The State Economic Council is responsible for increasing economic development of the state by collecting statistics and performing analysis on the labor force, workforce and employer demographics, generational trends, etc."
          },
          {
            "identifier": "2",
            "name": "Advisory Council for Infectious Disease",
            "imageUrl": "https://dkan-default-content-files.s3.amazonaws.com/files/publishers/clipboard.png",
            "description": "Advisory Council for Infectious Disease is a working group that performs research and prepares reports to inform treatment and prevention programs nationally."
          },
          {
            "identifier": "3",
            "name": "Committee on International Affairs",
            "imageUrl": "https://dkan-default-content-files.s3.amazonaws.com/files/publishers/map.png",
            "description": "The Committee on International Affairs is a working group to identify opportunities to learn from and collaborate with government and organizations across the globe."
          }
        ]}
      >
        <p>My content</p>
      </Publishers>
    );
    expect(screen.getByRole('heading', {name: 'My Title'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Committee on International Affairs'})).toBeInTheDocument();
    expect(screen.getAllByRole('heading')).toHaveLength(4);
    expect(screen.getByText('My content')).toBeInTheDocument();
    expect(screen.getByText('Advisory Council for Infectious Disease is a working group that performs research and prepares reports to inform treatment and prevention programs nationally.')).toBeInTheDocument();
  });
});