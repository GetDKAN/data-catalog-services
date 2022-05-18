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
    groupings,
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

  let url = `${rootUrl}/datastore/query/${id}`;
  if (Array.isArray(id)) {
    url = `${rootUrl}/datastore/query/${id[0]}/${id[1]}`;
  }
  const params = {
    keys: keys,
    limit: limit,
    offset: offset,
    conditions: conditions,
    sorts: sort,
    properties: properties,
    groupings: groupings,
    ...additionalParams,
  };

  const res = await axios.get(`${url}?${qs.stringify(params)}`);
  const data = res.data;

  let schema_fields = [];
  if (Object.keys(data.schema).length > 0) {
    const schemaId = Object.keys(data.schema)[0];
    schema_fields = Object.keys(data.schema[schemaId].fields);
  }

  setValues(data.results);
  setCount(data.count);
  if (schema_fields.length) {
    setColumns(prepareColumns ? prepareColumns(schema_fields) : schema_fields);
  }
  setSchema(data.schema);
  if (typeof setLoading === "function") {
    setLoading(false);
  }

  return data;
}
