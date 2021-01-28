import {useState, useEffect} from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { updateSelectedFacetObject } from './helpers';

async function fetchDatasets(rootUrl, fulltext, selectedFacets, sort, sortOrder) {
  let params = {
    fulltext: fulltext ? fulltext : '',
    ...selectedFacets,
    sort: sort ? sort : '',
    ['sort-order']: sortOrder ? sortOrder : ''
  }
  return await axios.get(`${rootUrl}/search/?${queryString.stringify(params, {arrayFormat: 'comma', skipEmptyString: true })}`)
}

const useSearchAPI = (rootUrl) => {
  const sortOptions = ['modified', 'title'];
  const sortOrderOptions = ['asc', 'desc'];
  const [items, setItems] = useState([]);
  const [facets, setFacets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(null)
  const [selectedFacets, setSelectedFacets] = useState({})
  const [fulltext, setFulltext] = useState('')
  const [sort, setSort] = useState('');
  const [sortOrder, setSortOrder] = useState('')
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10)

  async function search() {
    const results = await fetchDatasets(rootUrl, fulltext, selectedFacets, sort, sortOrder);
    const itemKeys = Object.keys(results.data.results);
    const itemsArray = itemKeys.map((key) => {
      return results.data.results[key]
    })
    setFacets(results.data.facets)
    setItems(itemsArray)
    setTotalItems(results.data.total)
    setLoading(false)
  }

  function updateFacetSelection(currentFacet) {
    const facets = updateSelectedFacetObject(currentFacet, selectedFacets);
    setSelectedFacets(facets);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true)
      search()
    }, 1000);
    return () => clearTimeout(timer);
  }, [fulltext, selectedFacets, sort, sortOrder])

  return {
    sortOptions,
    sortOrderOptions,
    items,
    facets,
    loading,
    totalItems,
    sort,
    sortOrder,
    page,
    pageSize,
    setPage,
    setPageSize,
    setSort,
    setSortOrder,
    updateSelectedFacets,
    setFulltext,
  }
}

export default useSearchAPI;
