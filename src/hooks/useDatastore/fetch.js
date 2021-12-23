import axios from "axios";
import qs from "qs";

export async function fetchDataFromQuery(
  id,
  rootUrl,
  options,
  additionalParams
) {
  const {
    keys,
    limit,
    offset,
    conditions,
    sort,
    prepareColumns,
    properties,
    setValues,
    setCount,
    setColumns,
    setLoading,
    setSchema,
  } = options;
  if (!id) {
    // TODO: Throw error
    return false;
  }
  if (typeof setLoading === "function") {
    setLoading(true);
  }

  let url = Array.isArray(id)
    ? `${rootUrl}/datastore/query/${id[0]}/${id[1]}`
    : `${rootUrl}/datastore/query/${id}`;
  return await axios({
    method: "GET",
    url: url,
    params: {
      keys: keys,
      limit: limit,
      offset: offset,
      conditions: conditions,
      sorts: sort,
      properties: properties,
      ...additionalParams,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params);
    },
  }).then((res) => {
    const { data } = res;
    const propertyKeys =
      data.schema[id] && data.schema[id].fields
        ? Object.keys(data.schema[id].fields)
        : [];
    setValues(data.results), setCount(data.count);
    if (propertyKeys.length) {
      setColumns(prepareColumns ? prepareColumns(propertyKeys) : propertyKeys);
    }
    setSchema(data.schema);
    if (typeof setLoading === "function") {
      setLoading(false);
    }
    return data;
  });
}
