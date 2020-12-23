import {useState, useEffect} from 'react';
import axios from 'axios';
import { prepareColumns } from '../../Resource/helpers';

const useDatastoreSQL = (resourceId, rootAPIUrl, options) => {
  const [id, setResource] = useState(resourceId);
  const [rootUrl, setRootUrl] = useState(rootAPIUrl);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState([]);
  const [count, setCount] = useState(null);
  const [rowsTotal, setRowsTotal] = useState(null);
  const [columns, setColumns] = useState([]);
  const [limit, setLimit] = useState(options.limit ? options.limit : 20);
  const [offset, setOffset] = useState(options.offset ? options.offset : 0);
  const keys = options.keys ? options.keys : true;
  const [conditions, setConditions] = useState('');

  useEffect(() => {
    const sqlCount = () => (axios.get(`${rootUrl}/datastore/sql/?query=[SELECT COUNT(*) FROM ${id}];${keys ? '&show-db-columns' : ''}`));
    const sqlQuery = () => (axios.get(`${rootUrl}/datastore/sql/?query=[SELECT * FROM ${id}]${conditions}[LIMIT ${limit} OFFSET ${offset}];${keys ? '&show-db-columns' : ''}`));
    async function fetchData() {
      if(!id) {
        return false;
      }
      setLoading(true);
      Promise.all([sqlCount(), sqlQuery()])
        .then((res) => {
          console.log(res)
          const sqlCountRes = res[0];
          const { data } = res[1];
          setCount(Number(sqlCountRes.data[0].expression))
          setRowsTotal(Number(sqlCountRes.data[0].expression))
          setValues(data)
          if(data.length) {
            setColumns(options.prepareColumns ? prepareColumns(Object.keys(data[0])) : Object.keys(data[0]))
          }
          setLoading(false)
        })
    }
    fetchData();
  }, [id, rootUrl, limit, offset, conditions])

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
  }
}

export default useDatastoreSQL;