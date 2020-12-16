import axios from 'axios';
import {renderHook, act} from '@testing-library/react-hooks'
import '@testing-library/jest-dom/extend-expect';
import { useMetastoreDataset } from '.';
jest.mock('axios');
const id = '1234-abcd';
const rootUrl = 'http://dkan.com/api/1'
const data = {
  data: [
    {
      title: "DKAN Dataset Title",
      description: "DKAN Dataset Description",
      identifier: "1234-abcd"
    }
  ]
}

describe('useDataset Custom Hook', () => {
  test('returns dataset from metadata store', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    const { result } = renderHook(() => useMetastoreDataset())
    await act(async () => {
      result.current.setQuery({
        rootUrl: rootUrl,
        id: id,
      });
    });
    expect(result.current.dataset).toEqual(data.data);
    expect(axios.get).toHaveBeenCalledWith(
      `${rootUrl}/metastore/schemas/dataset/items/${id}?show-reference-ids`,
    );
  });
});
