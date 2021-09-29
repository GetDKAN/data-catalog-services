import axios from 'axios';
import queryString from 'query-string';
import qs from 'qs';

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

export async function fetchDatasets(rootUrl, options, additionalParams) {
  const { fulltext, selectedFacets, sort, sortOrder, page, pageSize } = options;
  
  let params = {
    fulltext: fulltext ? fulltext : '',
    ...selectedFacets,
    sort: sort ? sort : '',
    ['sort-order']: sortOrder ? sortOrder : '',
    page: page !== 1 ? page : '',  //use index except for when submitting to Search API
    ['page-size']: pageSize !== 10 ? pageSize : '',
    ...additionalParams
  }
  return await axios.get(`${rootUrl}/search/?${queryString.stringify(params, {arrayFormat: 'comma', skipEmptyString: true })}`)
}

export function stringifySearchParams(selectedFacets, fulltext, sort) {
  let newParams = {...selectedFacets}
  if(fulltext) {
    newParams.fulltext = fulltext;
  }
  if(sort) {
    newParams.sort = sort;
  }
  return qs.stringify(newParams, {addQueryPrefix: true, encode: false, arrayFormat: 'brackets'})
}
