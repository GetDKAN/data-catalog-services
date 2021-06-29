import {useState, useEffect, useRef} from 'react';
import { fetchDataFromQuery } from './fetch';

const useDatastore = (resourceId, rootAPIUrl, options, additionalParams={}) => {
  const keys = options.keys ? options.keys : true;
  const { prepareColumns } = options;
  const [manual, setManual] = useState(options.manual ? options.manual : false);
  const [requireConditions, setRequireConditions] = useState(options.requireConditions ? options.requireConditions : false);
  const [values, setValues] = useState([]);
  const [id, setResource] = useState(resourceId);
  const [rootUrl, setRootUrl] = useState(rootAPIUrl);
  const [limit, setLimit] = useState(options.limit ? options.limit : 20);
  const [count, setCount] = useState(null);
  const [columns, setColumns] = useState([]);
  const [offset, setOffset] = useState(options.offset ? options.offset : 0);
  const [loading, setLoading] = useState(false);
  const [conditions, setConditions] = useState(options.conditions ? options.conditions : undefined);
  const [sort, setSort] = useState(options.sort ? options.sort : undefined);
  const [schema, setSchema] = useState({});
  // const [joins, setJoins] = useState()
  const [properties, setProperties] = useState(options.properties ? options.properties : undefined)
  const prevLimitRef = useRef();

  useEffect(() => {
    prevLimitRef.current = limit;
  })
  const prevLimit = prevLimitRef.current;

  // useEffect(() => {
  //   const newOffset = prevLimit === limit ? offset : 0;
  //   setOffset(newOffset)
  // }, [limit])
  
  function fetchData() {
    const newOffset = prevLimit === limit ? offset : 0;
      fetchDataFromQuery(id, rootUrl,
        { keys, limit, offset: newOffset, conditions, sort, prepareColumns, setValues, setCount, setColumns, setLoading, setSchema},
        additionalParams
      )
  }

  useEffect(() => {
    if(!loading && !manual) {
      if (!requireConditions) {
        fetchData()
      }
      else if(requireConditions) {
        if (conditions && conditions.length) {
          fetchData()
        }
        else {
          setCount(null);
          setValues([]);
        }
      }
    }
    
  }, [id, rootUrl, offset, conditions, sort, limit, requireConditions])

  return {
    loading,
    values,
    count,
    columns,
    limit,
    offset,
    schema,
    conditions,
    setResource,
    setRootUrl,
    setLimit,
    setOffset,
    setConditions,
    setSort,
    setManual,
    setRequireConditions,
    fetchData,
  }
}

export default useDatastore;
