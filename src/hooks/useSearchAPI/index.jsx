import {useState, useEffect, useRef} from 'react';
import axios from 'axios';

async function fetchDatasets(rootUrl) {
  return await axios.get(`${rootUrl}/search`)
}

const useSearchAPI = (rootUrl) => {
  const [items, setItems] = useState([]);
  const [facetResults, setFacetResults] = useState();
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(null)

  useEffect(() => {
    async function search() {
      const results = await fetchDatasets(rootUrl);
      const itemKeys = Object.keys(results.data.results);
      const itemsArray = itemKeys.map((key) => {
        return results.data.results[key]
      })
      setItems(itemsArray)
      setTotalItems(results.data.total)
    }
    search()
  }, [])

  return {
    items,
    facetResults,
    loading,
    totalItems
  }
}

export default useSearchAPI;
