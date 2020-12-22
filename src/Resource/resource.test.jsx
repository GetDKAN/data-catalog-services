import React from 'react';
import axios from 'axios';
import {act} from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import Resource from './index';
import { ResourceDispatch } from './helpers';

jest.mock('axios');
const rootUrl = 'http://dkan.com/api/1';
const data = {
  data: {
    results: [{record_id: '1', column_1: 'fizz', column_2: 'dkan'}],
    count: '1'
  }
}
const distribution = {
  identifier: "1234-1234",
  data: {
    downloadURL: `${rootUrl}/files/file.csv`,
    format: "csv",
    title: "Dist Title"
  }
}

const MyTestComponent = () => {
  const { totalRows, items, actions, limit, offset } = React.useContext(ResourceDispatch)
  const { setLimit, setOffset } = actions;
  return (
    <div>
      <p>{items[0].column_1} and {totalRows} and {limit} and {offset}</p>
      <button onClick={() => setLimit(25)}>Up Limit</button>
      <button onClick={() => setOffset(10)}>Up Offset</button>
    </div>
  )
}

describe('<Resource />', () => {
  test('renders data', async () => {
    await act(async () => {
      await axios.post.mockImplementation(() => Promise.resolve(data));
      render(
        <Resource
          distribution={distribution}
          rootUrl={rootUrl}
        >
          <MyTestComponent />
        </Resource>
      );
    });
    expect(screen.getByText('fizz and 1 and 20 and 0')).toBeInTheDocument();
    await act(async () => {
      userEvent.click(screen.getByText('Up Limit'));
    });
    expect(screen.getByText('fizz and 1 and 25 and 0')).toBeInTheDocument();
    await act(async () => {
      userEvent.click(screen.getByText('Up Offset'));
    });
    expect(screen.getByText('fizz and 1 and 25 and 10')).toBeInTheDocument();
    
  });
});