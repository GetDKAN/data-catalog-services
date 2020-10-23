export function checkIdPattern(id, index) {
  if(index === 0 && id.length === 1) {
    if(typeof(id[0]) !== "string"){
      throw `Array index ${index} does not contain strings.`;
    }
    return true;
  }
  if(id.length !== 2) {
    throw `Array index ${index} has incorrect length.`;
  }
  if(typeof(id[0]) !== "string" || typeof(id[1]) !== "string") {
    throw `Array index ${index} does not contain strings.`;
  }
  return true;
}

export function buildResources(ids) {
  const returnedResources = [];
  if(!Array.isArray(ids)) {
    throw 'Parameter ids is not of type array';
  }
  ids.forEach((id, index) => {
    checkIdPattern(id, index);
    returnedResources.push({
      "id": id[0],
      "alias": id[1] ? id[1] : "t"
    })
  });
  return returnedResources;
}

export function buildSort(isAsc, sort) {
  const returnedSortArray = [];
  const sortKey = isAsc ? "asc" : "desc";
  if(typeof(isAsc) !== "boolean") {
    throw 'Parameter isAsc must be of type boolean';
  }
  if(!Array.isArray(sort)) {
    throw 'Parameter sort must be of type array';
  }
  sort.forEach((item, index) => {
    checkIdPattern(item, index);
    returnedSortArray.push({
      "resource": item[1] ? item[1] : "t",
      "property": item[0]
    })
  });
  return {[sortKey]: returnedSortArray};
}

export function buildConditions(staticFilters, dynamicFilters) {
  const returnedConditions = [];
  if(!Array.isArray(staticFilters)) {
    throw 'Parameter staticFilters must be of type array';
  }
  if(!Array.isArray(dynamicFilters)) {
    throw 'Parameter dynamicFilters must be of type array';
  }
  if(dynamicFilters.length) {
    dynamicFilters.forEach((f) => {
      if(!f.id || !f.value) {
        throw 'Parameter dynamicFilters must be an object with keys of id and value';
      }
      returnedConditions.push({
        "resource": f.alias ? f.alias : "t",
        "property": f.id,
        "value": [f.value],
        "operator": f.operator ? f.operator : "="
      });
    });
  }
  if(staticFilters.length) {
    staticFilters.forEach((f) => {
      if(!f.id || !f.value) {
        throw 'Parameter staticFilters must be an object with keys of id and value';
      }
      returnedConditions.push({
        "resource": f.alias ? f.alias : "t",
        "property": f.id,
        "value": [f.value],
        "operator": f.operator ? f.operator : "="
      });
    });
  }
  return returnedConditions;
}
