import {useState, useEffect} from 'react';
import axios from 'axios';
import { prepareColumns } from '../../Resource/helpers';
import { sort } from 'core-js/fn/array';

// {id: "record_number", desc: true}

// "sort": {
  //   "desc": [ "record_number" ],
  //   "asc": []
  // }
export function transformTableSortToQuerySort(sortArray) {
  let newQuery = {
    asc: [],
    desc: [],
  }
  sortArray.forEach((s) => {
    if (s.desc) {
      return newQuery.desc.push(s.id)
    } else {
      return newQuery.asc.push(s.id)
    }
  })
  return newQuery;
}



export function transformTableFilterToQueryCondition(filterArray) {
  const conditions = filterArray.map((f) => {
    return {
      resource: 't',
      property: f.id,
      value: `%${f.value}%`, //% doesn't work %
      operator: 'like',
    }
  });
  return conditions;
}
// OPERATORS
// =
// <> not equal to
// BETWEEN
// IN
// NOT IN
// >=
// <=
// like

const useDatastoreQuery = (resourceId, rootAPIUrl, options) => {
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

export default useDatastoreQuery;