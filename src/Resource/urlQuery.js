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
  query.conditions.forEach((condition) => {
    queryURL.push(`${condition.property}[conditions]=${condition.value}`);
    if(condition.operator !== '=') {
      queryURL.push(`${condition.property}[operator]=${condition.operator}`);
    }
  })

  return queryURL.join('&');
}

export function transformURLtoDatastoreQuery(url) {
  if (url.charAt(0) == "?") {
    url = url.substr(1);
  }
  let datastoreQuery = {
    conditions: []
  }
  let params = url.split('&')

  let queryArray = params.map((param) => {
    const paramType =  param.substring(
      param.lastIndexOf("[") + 1, 
      param.lastIndexOf("]")
    );
    const columnName = param.substring(0, param.lastIndexOf("["))
    const value = param.substring(param.lastIndexOf("=") + 1)
    return {
      paramType,
      columnName,
      value,
    }
  })


  queryArray.forEach((query) => {
    const {paramType, columnName, value} = query;
    const currentConditionIndex = datastoreQuery.conditions.findIndex((obj) => obj.property === columnName);
    if(currentConditionIndex > -1) {
      if(paramType === 'conditions') {
        datastoreQuery.conditions[currentConditionIndex].value = value
      } else {
        datastoreQuery.conditions[currentConditionIndex].operator = value
      }
    } else {
      if(paramType === 'conditions') {
        datastoreQuery.conditions = [
          ...datastoreQuery.conditions,
          {
            resource: 't',
            property: columnName,
            value: value,
            operator: '='
          }
        ]
      } else {
        datastoreQuery.conditions = [
          ...datastoreQuery.conditions,
          {
            resource: 't',
            property: columnName,
            value: '',
            operator: value
          }
        ]
      }
    }
  })
  return datastoreQuery;
}
