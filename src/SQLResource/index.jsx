import React, { useState } from 'react';
import useDatastoreSQL from '../hooks/useDatastoreSQL';
import { ResourceDispatch } from '../Resource/helpers';

const SQLResource = ({ distribution, rootUrl, children, options }) => {
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
  } = useDatastoreSQL(identifier, rootUrl, options);
  const actions = {
    setResource,
    setLimit,
    setOffset,
    setCurrentPage,
    setConditions,
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
      {(values && values.length)
        && children
      }
    </ResourceDispatch.Provider>
  );
}

export default SQLResource;
