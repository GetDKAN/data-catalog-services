import axios from 'axios';
import qs from 'qs'

export async function fetchDataFromQuery(id, rootUrl, options, additionalParams) {
  const { keys, limit, offset, conditions, sort, prepareColumns, setValues, setCount, setColumns, setLoading, setSchema } = options;
  if(!id) {
    // TODO: Throw error
    return false;
  }
  if(typeof setLoading === 'function') {
    setLoading(true);
  }
  // return await axios.post(`${rootUrl}/datastore/query/?`, {
  //   resources: [{id: id, alias: 't'}],
  //   keys: keys,
  //   limit: limit,
  //   offset: offset,
  //   conditions: conditions,
  //   sort: sort,
  //   ...additionalParams
  // })
  return await axios({
    method: 'GET',
    url: `${rootUrl}/datastore/query/${id}`,
    params: {
      keys: keys,
      limit: limit,
      offset: offset,
      conditions: conditions,
      sort: sort,
      ...additionalParams,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params)
    }
  })
  .then((res) => {
    const { data } = res;
    setValues(data.results),
    setCount(data.count)
    if(data.results.length) {
      setColumns(prepareColumns ? prepareColumns(Object.keys(data.results[0])) : Object.keys(data.results[0]))
    }
    setSchema(data.schema)
    if(typeof setLoading === 'function') {
      setLoading(false);
    }
    return data;
  })
}
