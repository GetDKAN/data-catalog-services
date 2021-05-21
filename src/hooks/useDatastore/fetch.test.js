import axios from 'axios';
import { fetchDataFromQuery } from './fetch';

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

describe('fetchDataFromQuery', () => {
  test('returns data from datastore query endpoint', async () => {
    axios.post.mockImplementation(() => Promise.resolve(data));
    const results = await fetchDataFromQuery(distribution.identifier, rootUrl, {
      keys: true,
      limit: 20,
      offset: 0,
      conditions: [],
      sorts: [],
      setValues: () => {},
      setCount: () => {},
      setColumns: () => {},
      setSchema: () => {}
    })
    expect(results.count).toEqual(data.data.count);
    expect(results.results).toEqual(data.data.results);
  })
});