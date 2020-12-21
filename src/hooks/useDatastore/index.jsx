import {useState, useEffect} from 'react';
import axios from 'axios';
import { prepareColumns } from '../../Resource/helpers';



const useDatastore = (resourceId, rootAPIUrl, options) => {
  const keys = options.keys ? options.keys : true;
  const [values, setValues] = useState([]);
  const [id, setResource] = useState(resourceId);
  const [rootUrl, setRootUrl] = useState(rootAPIUrl);
  const [limit, setLimit] = useState(options.limit ? options.limit : 20);
  const [count, setCount] = useState(null);
  const [columns, setColumns] = useState([]);
  const [offset, setOffset] = useState(options.offset ? options.offset : 0);
  const [loading, setLoading] = useState(false);
  const [conditions, setConditions] = useState()
  const [sort, setSort] = useState()
  // const [joins, setJoins] = useState()
  // const [properties, setProperties] = useState()

  useEffect(() => {
    async function fetchData() {
      if(!id) {
        return false;
      }
      setLoading(true)
      return await axios({
        method: 'post',
        url: `${rootUrl}/datastore/query/?`,
        data: {
          'resources': [{id: id, alias: 't'}],
          keys: keys,
          limit: limit,
          offset: offset,
          conditions: conditions,
          sort: sort,
        }
      })
      .then((res) => {
        const { data } = res;
        setValues(data.results),
        setCount(data.count)
        if(data.results.length) {
          setColumns(options.prepareColumns ? prepareColumns(Object.keys(data.results[0])) : Object.keys(data.results[0]))
        }
        setLoading(false)
      })
    }
    fetchData()
  }, [id, rootUrl, limit, offset, conditions, sort])
  
  return {
    loading,
    values,
    count,
    columns,
    limit,
    offset,
    setResource,
    setRootUrl,
    setLimit,
    setOffset,
    setConditions,
    setSort,
  }
}

export default useDatastore;