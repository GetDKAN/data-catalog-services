import { separateFacets, isSelectedFacet, updateSelectedFacetObject } from './helpers';

const facetArray = [
  {name: "name-1", total: "1", type: "theme"},
  {name: "name-x", total: "3", type: "theme"},
  {name: "name-2", total: "2", type: "keyword"}
];

const selectedFacets = {theme: ['dkan', 'foobar', 'react']};

describe('separateFacets', () => {
  test('transform an array of facet objects into an object with facet type keys', async () => {
    expect(separateFacets(facetArray)).toEqual(
      {
        theme: [
          {name: "name-1", total: "1", type: "theme"},
          {name: "name-x", total: "3", type: "theme"}], 
        keyword: [
          {name: "name-2", total: "2", type: "keyword"}]
      }
    );
  });
});

describe('isSelectedFacet', () => {
  test('find the index of a facet in a list of selected facets', async () => {
    const currentFacet = {key: 'theme', value: 'react'};
    const currentFacet2 = {key: 'theme', value: 'javascript'};
    expect(isSelectedFacet(currentFacet, selectedFacets)).toEqual(2);
    expect(isSelectedFacet(currentFacet2, selectedFacets)).toEqual(-1);
  });
  test('returns -1 when key not in selected facets', async () => {
    const currentFacet3 = {key: 'keyword', value: 'javascript'};
    expect(isSelectedFacet(currentFacet3, selectedFacets)).toEqual(-1);
  });
});

describe('updateSelectedFacets', () => {
  test('adds facet to selectedFacets', async () => {
    const currentFacet = {key: 'theme', value: 'javascript'};
    expect(updateSelectedFacetObject(currentFacet, selectedFacets)).toEqual({theme: ['dkan', 'foobar', 'react', 'javascript']});
  });
  test('removes facet from selectedFacets', async () => {
    const currentFacet = {key: 'theme', value: 'react'};
    expect(updateSelectedFacetObject(currentFacet, selectedFacets)).toEqual({theme: ['dkan', 'foobar']});
  });
  test('adds category to selectedFacets', async () => {
    const currentFacet = {key: 'keyword', value: 'bar'};
    expect(updateSelectedFacetObject(currentFacet, selectedFacets)).toEqual({theme: ['dkan', 'foobar'], keyword: ['bar']});
  });
  test('adds category to selectedFacets when empty', async () => {
    const currentFacet = {key: 'keyword', value: 'bar'};
    expect(updateSelectedFacetObject(currentFacet, {})).toEqual({keyword: ['bar']});
  });
});
