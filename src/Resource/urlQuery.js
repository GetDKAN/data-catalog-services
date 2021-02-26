//  resources: [{id: id, alias: 't'}],
// keys: keys,
// limit: limit,
// offset: offset,
// conditions: conditions,
// sort: sort,

  // CONDITION
  // resource: 't',
  // property: f.id,
  // value: `%${f.value}%`,
  // operator: 'LIKE',

// column_name[action]=action_value

export function transformDatastoreQueryToURL(query) {
  let queryURL = [];
  const queryKeys = Object.keys(query);
  queryKeys.forEach((key) => {
    queryURL.push(`${query[key][0].property}[${key}]=${query[key][0].value}`)
  })

  return queryURL.join('&');
}

export function transformURLtoDatastoreQuery(url) {
  if (url.charAt(0) == "?") {
    url = url.substr(1);
  }
  let datastoreQuery = {}
  let params = url.split('&')
  params.forEach((param) => {
    const paramType =  param.substring(
      param.lastIndexOf("[") + 1, 
      param.lastIndexOf("]")
    );
    const columnName = param.substring(0, param.lastIndexOf("["))
    const value = param.substring(param.lastIndexOf("=") + 1)
    datastoreQuery[paramType] = [
      {
        resource: 't',
        property: columnName,
        value: value,
        operator: '='
      }
    ];
    // if (paramType === 'conditions') {
    //   conditions.push({column: columnName, value: value});
    // }

    

  })

  // console.log(conditions)







  return datastoreQuery
}
