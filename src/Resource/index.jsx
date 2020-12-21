import React, { useState } from 'react';
import useDatastoreQuery from '../hooks/useDatastoreQuery';
import { ResourceDispatch } from './helpers';

const Resource = ({ distribution, rootUrl, children, options }) => {
  const { identifier } = distribution;
  const [currentPage, setCurrentPage] = useState(0);
  const { 
    loading,
    values,
    columns,
    count,
    limit,
    offset,
    setResource,
    setLimit,
    setOffset,
    setConditions,
    setSort,
  } = useDatastoreQuery(identifier, rootUrl, options);
  const actions = {
    setResource,
    setLimit,
    setOffset,
    setCurrentPage,
    setConditions,
    setSort,
  };
  return (
    <ResourceDispatch.Provider value={{
      loading: loading,
      items: values,
      columns: columns,
      actions: actions,
      totalRows: count,
      limit: limit,
      offset: offset,
      currentPage: currentPage,
    }}>
      {(values)
        && children
      }
    </ResourceDispatch.Provider>
  );
}

export default Resource;
