import axios from "axios";
import {
  separateFacets,
  isSelectedFacet,
  updateSelectedFacetObject,
  fetchDatasets,
  stringifySearchParams,
} from "./helpers";

jest.mock("axios");
const rootUrl = "http://dkan.com/api/1";
const data = {
  data: {
    total: "0",
    results: [],
    facets: [],
  },
};
const facetArray = [
  { name: "name-1", total: "1", type: "theme" },
  { name: "name-x", total: "3", type: "theme" },
  { name: "name-2", total: "2", type: "keyword" },
];

const selectedFacets = { theme: ["dkan", "foobar", "react"] };

describe("separateFacets", () => {
  test("transform an array of facet objects into an object with facet type keys", async () => {
    expect(separateFacets(facetArray)).toEqual({
      theme: [
        { name: "name-1", total: "1", type: "theme" },
        { name: "name-x", total: "3", type: "theme" },
      ],
      keyword: [{ name: "name-2", total: "2", type: "keyword" }],
    });
  });
});

describe("isSelectedFacet", () => {
  test("find the index of a facet in a list of selected facets", async () => {
    const currentFacet = { key: "theme", value: "react" };
    const currentFacet2 = { key: "theme", value: "javascript" };
    expect(isSelectedFacet(currentFacet, selectedFacets)).toEqual(2);
    expect(isSelectedFacet(currentFacet2, selectedFacets)).toEqual(-1);
  });
  test("returns -1 when key not in selected facets", async () => {
    const currentFacet3 = { key: "keyword", value: "javascript" };
    expect(isSelectedFacet(currentFacet3, selectedFacets)).toEqual(-1);
  });
});

describe("updateSelectedFacets", () => {
  test("adds facet to selectedFacets", async () => {
    const currentFacet = { key: "theme", value: "javascript" };
    expect(updateSelectedFacetObject(currentFacet, selectedFacets)).toEqual({
      theme: ["dkan", "foobar", "react", "javascript"],
    });
  });
  test("removes facet from selectedFacets", async () => {
    const currentFacet = { key: "theme", value: "react" };
    expect(updateSelectedFacetObject(currentFacet, selectedFacets)).toEqual({
      theme: ["dkan", "foobar"],
    });
  });
  test("adds category to selectedFacets", async () => {
    const currentFacet = { key: "keyword", value: "bar" };
    expect(updateSelectedFacetObject(currentFacet, selectedFacets)).toEqual({
      theme: ["dkan", "foobar"],
      keyword: ["bar"],
    });
  });
  test("adds category to selectedFacets when empty", async () => {
    const currentFacet = { key: "keyword", value: "bar" };
    expect(updateSelectedFacetObject(currentFacet, {})).toEqual({
      keyword: ["bar"],
    });
  });
});

describe("fetchDatasets", () => {
  test("requests default list of datasets from search API", async () => {
    axios.get.mockImplementation(() => Promise.resolve(data));
    await fetchDatasets(rootUrl, {});
    expect(axios.get).toHaveBeenCalledWith(`${rootUrl}/search/?`);
  });
  test("requests fulltext filtered list of datasets from search API", async () => {
    axios.get.mockImplementation(() => Promise.resolve(data));
    await fetchDatasets(rootUrl, { fulltext: "data" });
    expect(axios.get).toHaveBeenCalledWith(`${rootUrl}/search/?fulltext=data`);
  });
  test("requests sorted list of datasets from search API", async () => {
    axios.get.mockImplementation(() => Promise.resolve(data));
    await fetchDatasets(rootUrl, { sort: "alpha" });
    expect(axios.get).toHaveBeenCalledWith(`${rootUrl}/search/?sort=alpha`);
  });
  test("requests sort ordered list of datasets from search API", async () => {
    axios.get.mockImplementation(() => Promise.resolve(data));
    await fetchDatasets(rootUrl, { sortOrder: "asc" });
    expect(axios.get).toHaveBeenCalledWith(`${rootUrl}/search/?sort-order=asc`);
  });
  test("requests list of datasets from search API using theme facets", async () => {
    axios.get.mockImplementation(() => Promise.resolve(data));
    await fetchDatasets(rootUrl, {
      selectedFacets: { theme: ["test", "dkan"] },
    });
    expect(axios.get).toHaveBeenCalledWith(
      `${rootUrl}/search/?theme=test,dkan`
    );
  });
  test("requests list of datasets from search API using theme and keyword facets", async () => {
    axios.get.mockImplementation(() => Promise.resolve(data));
    await fetchDatasets(rootUrl, {
      selectedFacets: { theme: ["test", "dkan"], keyword: ["react"] },
    });
    expect(axios.get).toHaveBeenCalledWith(
      `${rootUrl}/search/?keyword=react&theme=test,dkan`
    );
  });
});

describe("stringifySearchParams", () => {
  test("returns fulltext", async () => {
    expect(stringifySearchParams({}, "foobar", "")).toEqual("?fulltext=foobar");
  });
  test("returns sort", async () => {
    expect(stringifySearchParams({}, "", "title")).toEqual("?sort=title");
  });
  test("returns selectedFacets", async () => {
    const selectedFacets = { theme: ["dkan"], keyword: ["foobar", "fizzbang"] };
    expect(stringifySearchParams(selectedFacets, "", "")).toEqual(
      "?theme[]=dkan&keyword[]=foobar&keyword[]=fizzbang"
    );
  });
  test("returns everything", async () => {
    const selectedFacets = { theme: ["dkan"], keyword: ["foobar", "fizzbang"] };
    expect(stringifySearchParams(selectedFacets, "blah", "title")).toEqual(
      "?theme[]=dkan&keyword[]=foobar&keyword[]=fizzbang&fulltext=blah&sort=title"
    );
  });
});
