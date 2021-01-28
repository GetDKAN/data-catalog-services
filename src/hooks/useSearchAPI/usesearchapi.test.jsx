import axios from 'axios';
import { waitFor } from '@testing-library/react';
import {renderHook, act } from '@testing-library/react-hooks'
import '@testing-library/jest-dom/extend-expect';
import useSearchAPI, {fetchDatasets} from '.';
jest.mock('axios');
jest.useFakeTimers();
// const id = '1234-abcd';
const rootUrl = 'http://dkan.com/api/1'
const data = {
  data: {
    total: '0',
    results: [],
    facets: [],
  }
}

describe('useSearchAPI Custom Hook', () => {
  test('return search results', async() => {
    axios.get.mockImplementation(() => Promise.resolve(data));
    const { result } = renderHook(() => useSearchAPI(rootUrl));
    await act(async () => { jest.runAllTimers() });
    expect(axios.get).toHaveBeenCalledWith(
      `${rootUrl}/search/?`,
    );
    expect(result.current.totalItems).toEqual(data.data.total);
  });

  // test('returns dataset from metadata store', async () => {
  //   axios.get.mockImplementation(() => Promise.resolve(data));
  //   const { result } = renderHook(() => useMetastoreDataset(id, rootUrl))
  //   await act(async () => { });
  //   expect(result.current.dataset).toEqual(data.data);
  
  //   await act(async () => { result.current.setId('foobar') });
  //   expect(axios.get).toHaveBeenCalledWith(
  //     `${rootUrl}/metastore/schemas/dataset/items/foobar?show-reference-ids`,
  //   );
  //   await act(async () => { result.current.setRootUrl('demosite') });
  //   expect(axios.get).toHaveBeenCalledWith(
  //     `demosite/metastore/schemas/dataset/items/foobar?show-reference-ids`,
  //   );
  // });
});
