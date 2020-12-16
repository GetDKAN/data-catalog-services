import { useState, useEffect } from 'react';
import axios from 'axios';

export async function fetchDataset(id, rootUrl) {
  return await axios.get(`${rootUrl}/metastore/schemas/dataset/items/${id}?show-reference-ids`);
}

export function useDataset() {
  const [dataset, setDataset] = useState({});
  const [query, setQuery] = useState({rootUrl: '', id: ''});

  const { rootUrl, id } = query;
  // let dataset = {}
  useEffect(() => {
    async function fetchData() {
      if(id && rootUrl) {
        return axios.get(`${query.rootUrl}/metastore/schemas/dataset/items/${query.id}?show-reference-ids`)
          .then((res) => setDataset(res.data));
      }
    }
    fetchData();
  }, [id, rootUrl]);
  return {dataset, setQuery};
}
