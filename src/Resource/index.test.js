
import axios from 'axios';
import {
  buildResources,
  buildSort,
  buildConditions
} from './functions';
import { responseResults } from './mock';

// jest.mock('axios');
// axios.mockResolvedValue({ data: responseResults });
//   const title = await getFirstAlbumTitle();
//   expect(title.results[0].key1).toEqual('dkan');

describe('buildResources', () => {
  it('throws exception if ids is not an array', async () => {
    expect(() => buildResources('12345')).toThrow('Parameter ids is not of type array');
  })
  it('throws exception if id is not an array of strings', async () => {
    expect(() => buildResources([[12345]])).toThrow('Array index 0 does not contain strings.');
    expect(() => buildResources([['12345', 5]])).toThrow('Array index 0 does not contain strings.');
    expect(() => buildResources([['12345', 't'], ['12345', true]])).toThrow('Array index 1 does not contain strings.');
  })
  it('returns resources if only 1 array item with length of 1', async () => {
    expect(buildResources([['1234']])).toEqual([{
      "id": "1234",
      "alias": "t"
    }]);
  });
  it('returns resources if only 1 array item with alias', async () => {
    expect(buildResources([['12345', 's']])).toEqual([{
      "id": "12345",
      "alias": "s"
    }]);
  })
  it('returns multiple resources in an array', async () => {
    expect(buildResources([['12345', 's'], ['67890', 'f']])).toEqual([
      { "id": "12345", "alias": "s" },
      { "id": "67890", "alias": "f" }
    ]);
  })
});

describe('buildSort', () => {
  it('throws exception if isAsc is not of type boolean', async () => {
    expect(() => buildSort('12345', [])).toThrow('Parameter isAsc must be of type boolean');
  })
  it('throws exception if sort is not of type array', async () => {
    expect(() => buildSort(true, '1234')).toThrow('Parameter sort must be of type array');
  })
  it('returns an ascending sort object', async () => {
    expect(buildSort(true, [['dkan']])).toEqual(
      {"asc": [{"resource": "t","property": "dkan"}]}
    );
  })
  it('returns a descending sort object', async () => {
    expect(buildSort(false, [['react', 'f']])).toEqual(
      {"desc": [{"resource": "f","property": "react"}]}
    );
  })
});

describe('buildConditions', () => {
  it('throws exception if staticFilters is not of type boolean', async () => {
    expect(() => buildConditions('12345', [])).toThrow('Parameter staticFilters must be of type array');
  })
  it('throws exception if dynamicFilters is not of type array', async () => {
    expect(() => buildConditions([], '1234')).toThrow('Parameter dynamicFilters must be of type array');
  })
  it('throws exception if filters do not have proper keys', async () => {
    expect(() => buildConditions([{"foo": 123, "id": "bar"}], [])).toThrow('Parameter staticFilters must be an object with keys of id and value');
    expect(() => buildConditions([], [{"foo": 123, "value": "bar"}])).toThrow('Parameter dynamicFilters must be an object with keys of id and value');
  })
  it('returns an array of only staticFilters', async () => {
    expect(buildConditions([{"id": "react", "value": "javascript"}], [])).toEqual([
      {
        "resource": "t",
        "property": "react",
        "value": ["javascript"],
        "operator": "="
      }
    ]);
  })
  it('returns an array of dynamicFilters', async () => {
    expect(buildConditions([], [{"id": "dkan", "value": "drupal", "alias": "d"}])).toEqual([
      {
        "resource": "d",
        "property": "dkan",
        "value": ["drupal"],
        "operator": "="
      }
    ]);
  })
  it('returns an array of conditions', async () => {
    expect(buildConditions([
      {"id": "react", "value": "javascript"}
    ],
    [
      {"id": "dkan", "value": "drupal", "alias": "d"},
      {"id": "php", "value": "unit", "operator": "math", "alias": "d"}
    ])).toEqual([
      {
        "resource": "d",
        "property": "dkan",
        "value": ["drupal"],
        "operator": "="
      },
      {
        "resource": "d",
        "property": "php",
        "value": ["unit"],
        "operator": "math"
      },
      {
        "resource": "t",
        "property": "react",
        "value": ["javascript"],
        "operator": "="
      }
    ]);
  })
});
