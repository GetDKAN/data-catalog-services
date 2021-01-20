import {useState, useEffect, useRef} from 'react';
import { fetchDataFromQuery } from './fetch';

const useDatastore = (resourceId, rootAPIUrl, options) => {
  const keys = options.keys ? options.keys : true;
  const { prepareColumns } = options;
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
  const prevLimitRef = useRef();

  useEffect(() => {
    prevLimitRef.current = limit;
  })
  const prevLimit = prevLimitRef.current;

  // useEffect(() => {
  //   const newOffset = prevLimit === limit ? offset : 0;
  //   setOffset(newOffset)
  // }, [limit])

  useEffect(() => {
    if(!loading) {
      const newOffset = prevLimit === limit ? offset : 0;
      fetchDataFromQuery(id, rootUrl,
        { keys, limit, offset: newOffset, conditions, sort, prepareColumns, setValues, setCount, setColumns, setLoading}
      )
    }
  }, [id, rootUrl, offset, conditions, sort, limit])

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
