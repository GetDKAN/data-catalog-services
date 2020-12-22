import axios from 'axios';
import {renderHook, act} from '@testing-library/react-hooks'
import '@testing-library/jest-dom/extend-expect';
import useDatastore from './';
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

describe('useDatastore Custom Hook', () => {
  test('returns data from datastore query endpoint', async () => {
    axios.post.mockImplementation(() => Promise.resolve(data));
    const { result } = renderHook(() => useDatastore(distribution.identifier, rootUrl, {}))
    await act(async () => { });
    expect(result.current.values).toEqual(data.data.results);
    expect(result.current.limit).toEqual(20);
    expect(result.current.offset).toEqual(0);
    expect(result.current.count).toEqual('1');
    expect(result.current.columns).toEqual(['record_id', 'column_1', 'column_2']);
    await act(async () => { result.current.setLimit(100) });
    expect(result.current.limit).toEqual(100);
    await act(async () => { result.current.setOffset(25) });
    expect(result.current.offset).toEqual(25);
  })
});
