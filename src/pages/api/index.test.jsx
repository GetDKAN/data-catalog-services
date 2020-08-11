import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ApiDocsFull from './index';

describe('<ApiDocsFull />', () => {
  test('Displays default API Docs page', () => {
    render(
      <ApiDocsFull
        rootUrl="https://demo.getdkan.com/api/1"
      />
    );
    const pageClass = document.getElementsByClassName('dc-page');
    const innerClass = document.getElementsByClassName('page-content');
    const swaggerClass = document.getElementsByClassName('swagger-ui');
    expect(pageClass).toHaveLength(1);
    expect(innerClass).toHaveLength(1);
    expect(swaggerClass).toHaveLength(1);
  });

  test('Displays custom classes in API Docs page', () => {
    render(
      <ApiDocsFull
        rootUrl="https://demo.getdkan.com/api/1"
        containerClass="custom-container"
        innerClass="custom-inner"
      />
    );
    const pageClass = document.getElementsByClassName('dc-page');
    const innerClass = document.getElementsByClassName('page-content');
    const customPageClass = document.getElementsByClassName('custom-container');
    const customInnerClass = document.getElementsByClassName('custom-inner');
    const swaggerClass = document.getElementsByClassName('swagger-ui');
    expect(pageClass).toHaveLength(1);
    expect(customPageClass).toHaveLength(1);

    expect(innerClass).toHaveLength(0);
    expect(customInnerClass).toHaveLength(1);

    expect(swaggerClass).toHaveLength(1);
  });

  test('Displays SwaggerUI error with no rootUrl', () => {
    render( <ApiDocsFull/> );
    expect(screen.getByRole('heading', {name: 'No API definition provided.'})).toBeInTheDocument();
  });
});