export function separateFacets(facets) {
  let facetObj = {};
  facets.forEach((f) => {
    if(facetObj[f.type]) {
      facetObj[f.type] = [...facetObj[f.type], f]
    } else {
      facetObj[f.type] = [f]
    }
  })
  return facetObj;
}

export function isSelectedFacet(currentFacet, selectedFacets) {
  const isInSelectedFacets = selectedFacets[currentFacet.key] ? selectedFacets[currentFacet.key].indexOf(currentFacet.value) : -1;
  return isInSelectedFacets;
}

export function updateSelectedFacetObject(currentFacet, selectedFacets) {
  const key = currentFacet['key']
  let newFacetList = {...selectedFacets};
  if(newFacetList[key]) {
    const existingFacet = isSelectedFacet(currentFacet, newFacetList);
    if(existingFacet > -1) {
      newFacetList[key].splice(existingFacet, 1);
    } else {
      newFacetList[key] = [...newFacetList[key], currentFacet.value]
    }
  } else {
    newFacetList[key] = [currentFacet.value]
  }
  return newFacetList;
}
