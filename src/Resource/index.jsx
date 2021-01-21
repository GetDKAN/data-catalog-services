import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { createHistory, LocationProvider } from '@reach/router'
import useDatastore from '../hooks/useDatastore';
import { ResourceDispatch } from './helpers';

const Resource = ({ distribution, rootUrl, children, options }) => {
  const { identifier } = distribution;
  let history = createHistory(window)
  const basePath = `${history.location.origin}${history.location.pathname}`;
  const search = history.location.search;
  const [urlParams, setUrlParams] = useState(queryString.parse(search, {arrayFormat: 'index'}));
  const { 
    loading,
    values,
    columns,
    count,
    limit,
    offset,
    sort,
    conditions,
    setResource,
    setLimit,
    setOffset,
    setConditions,
    setSort,
  } = useDatastore(identifier, rootUrl, options);
  const actions = {
    setResource,
    setLimit,
    setOffset,
    setConditions,
    setSort,
  };

  useEffect(() => {
    setOffset(0)
  }, [limit])
  const prevParamRef = useRef();
  useEffect(() => {
    prevParamRef.current = urlParams;
  });
  const prevParam = prevParamRef.current;
  console.log(prevParam)
  useEffect(() => {
  
    let params = queryString.parse(search, {arrayFormat: 'index'})
    console.log(conditions, sort)
    if(conditions && conditions.length) {
      conditions.forEach((c) => {
        if(params[c.property]) {
          params[c.property] = []
        }
        params[c.property] = [c.value]
      })
    }
    if(sort && sort.asc.length) {
      sort.asc.forEach((s) => {
        if(params[s]) {
          params[s].push('asc')
        } else {
          params[s] = ['', 'asc']
        }
      })
    }
    if(sort && sort.desc.length) {
      sort.desc.forEach((s) => {
        if(params.s) {
          params[s].push('desc')
        } else {
          params[s] = ['', 'desc']
        }
      })
    }

    
    
    const urlString = queryString.stringify(params, {arrayFormat: 'index'})
    const searchParams = urlString ? `?${urlString}` : '';
    console.log('url', params)
    if(urlString !== search) {
      setUrlParams(params)
      window.history.pushState({}, 'Dataset', `${basePath}${searchParams}`);
    }
  }, [conditions, sort, search])


  return (
    <ResourceDispatch.Provider value={{
      loading: loading,
      items: values,
      columns: columns,
      actions: actions,
      totalRows: count,
      limit: limit,
      offset: offset,
      urlParams: urlParams,
    }}>
      {(values.length)
        && children
      }
    </ResourceDispatch.Provider>
  );
}

Resource.defaultProps = {
  options: {},
};

Resource.propTypes = {
  distribution: PropTypes.shape({
    identifier: PropTypes.string.isRequired,
    data: PropTypes.shape({
      downloadURL: PropTypes.string.isRequired,
      format: PropTypes.string,
      title: PropTypes.string,
      mediaType: PropTypes.string,
    })
  }).isRequired,
  rootUrl: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  options: PropTypes.shape({
    limit: PropTypes.number,
    offset: PropTypes.number,
    keys: PropTypes.bool,
    prepareColumns: PropTypes.func
  })
};

export default Resource;
