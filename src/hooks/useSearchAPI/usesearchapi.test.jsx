import axios from "axios";
import { renderHook, act } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
import useSearchAPI from ".";

jest.mock("axios");
jest.useFakeTimers();

const rootUrl = "http://dkan.com/api/1";
const data_no_results = {
  data: {
    total: "0",
    results: {},
    facets: [],
  },
};

const data_results = {
  data: {
    total: "1",
    results: {
      "dkan_dataset/5d69-frba": { title: "dkan" },
    },
    facets: [
      {
        type: "theme",
        name: "general",
        total: "2",
      },
    ],
  },
};

describe("useSearchAPI Custom Hook", () => {
  test("return 0 search results", async () => {
    axios.get.mockImplementation(() => Promise.resolve(data_no_results));
    const { result } = renderHook(() => useSearchAPI(rootUrl));
    await act(async () => {
      jest.runAllTimers();
    });
    expect(axios.get).toHaveBeenCalledWith(`${rootUrl}/search/?`);
    expect(result.current.totalItems).toEqual(data_no_results.data.total);
    expect(result.current.sortOptions).toEqual(["modified", "title"]);
    expect(result.current.sortOrderOptions).toEqual(["asc", "desc"]);
  });

  test("return 1 search results", async () => {
    axios.get.mockImplementation(() => Promise.resolve(data_results));
    const { result } = renderHook(() => useSearchAPI(rootUrl));
    await act(async () => {
      jest.runAllTimers();
    });
    expect(axios.get).toHaveBeenCalledWith(`${rootUrl}/search/?`);
    expect(result.current.totalItems).toEqual(data_results.data.total);
    expect(result.current.items[0]).toEqual({ title: "dkan" });
    expect(result.current.facets).toEqual(data_results.data.facets);
  });

  test("return 1 search results", async () => {
    axios.get.mockImplementation(() => Promise.resolve(data_results));
    const { result } = renderHook(() => useSearchAPI(rootUrl));
    await act(async () => {
      jest.runAllTimers();
    });
    expect(axios.get).toHaveBeenCalledWith(`${rootUrl}/search/?`);
    expect(result.current.selectedFacets).toEqual({});
    await act(async () => {
      result.current.updateSelectedFacets({ key: "theme", value: "dkan" });
    });
    await act(async () => {
      jest.runAllTimers();
    });
    expect(axios.get).toHaveBeenCalledWith(`${rootUrl}/search/?theme=dkan`);
    expect(result.current.selectedFacets).toEqual({ theme: ["dkan"] });
  });

  test("updates search request with new page", async () => {
    axios.get.mockImplementation(() => Promise.resolve(data_results));
    const { result } = renderHook(() => useSearchAPI(rootUrl));
    await act(async () => {
      jest.runAllTimers();
    });
    expect(axios.get).toHaveBeenCalledWith(`${rootUrl}/search/?`);
    expect(result.current.page).toEqual(1);
    await act(async () => {
      result.current.setPage(4);
    });
    await act(async () => {
      jest.runAllTimers();
    });
    expect(axios.get).toHaveBeenCalledWith(`${rootUrl}/search/?page=5`);
    expect(result.current.page).toEqual(4);
  });

  test("updates search request with new pageSize", async () => {
    axios.get.mockImplementation(() => Promise.resolve(data_results));
    const { result } = renderHook(() => useSearchAPI(rootUrl));
    await act(async () => {
      jest.runAllTimers();
    });
    expect(axios.get).toHaveBeenCalledWith(`${rootUrl}/search/?`);
    expect(result.current.pageSize).toEqual(10);
    await act(async () => {
      result.current.setPageSize(25);
    });
    await act(async () => {
      jest.runAllTimers();
    });
    expect(axios.get).toHaveBeenCalledWith(`${rootUrl}/search/?page-size=25`);
    expect(result.current.pageSize).toEqual(25);
  });

  test("tests resetFilters", async () => {
    axios.get.mockImplementation(() => Promise.resolve(data_results));
    const { result } = renderHook(() => useSearchAPI(rootUrl));
    await act(async () => {
      jest.runAllTimers();
    });
    expect(axios.get).toHaveBeenCalledWith(`${rootUrl}/search/?`);
    await act(async () => {
      result.current.updateSelectedFacets({ key: "theme", value: "dkan" });
    });
    await act(async () => {
      jest.runAllTimers();
    });
    expect(axios.get).toHaveBeenCalledWith(`${rootUrl}/search/?theme=dkan`);
    expect(result.current.selectedFacets).toEqual({ theme: ["dkan"] });
    await act(async () => {
      result.current.setFulltext("blah");
    });
    await act(async () => {
      jest.runAllTimers();
    });
    expect(axios.get).toHaveBeenCalledWith(
      `${rootUrl}/search/?fulltext=blah&theme=dkan`
    );
    expect(result.current.selectedFacets).toEqual({ theme: ["dkan"] });
    expect(result.current.fulltext).toEqual("blah");
    await act(async () => {
      result.current.setPage(2);
    });
    await act(async () => {
      jest.runAllTimers();
    });
    expect(axios.get).toHaveBeenCalledWith(
      `${rootUrl}/search/?fulltext=blah&page=3&theme=dkan`
    );
    expect(result.current.selectedFacets).toEqual({ theme: ["dkan"] });
    expect(result.current.fulltext).toEqual("blah");
    expect(result.current.page).toEqual(2);

    await act(async () => {
      result.current.resetFilters();
    });
    await act(async () => {
      jest.runAllTimers();
    });
    expect(axios.get).toHaveBeenCalledWith(`${rootUrl}/search/?`);
    expect(result.current.selectedFacets).toEqual({});
    expect(result.current.fulltext).toEqual("");
    expect(result.current.page).toEqual(0);
  });

  test("set hook with initial params", async () => {
    const params = {
      selectedFacets: { theme: ["dkan"] },
      sort: "alpha",
      page: 2,
      pageSize: 25,
      fulltext: "react",
      sortOrder: "foobar",
    };
    axios.get.mockImplementation(() => Promise.resolve(data_results));
    const { result } = renderHook(() => useSearchAPI(rootUrl, params));
    await act(async () => {
      jest.runAllTimers();
    });
    expect(axios.get).toHaveBeenCalledWith(
      `${rootUrl}/search/?fulltext=react&page=3&page-size=25&sort=alpha&sort-order=foobar&theme=dkan`
    );

    expect(result.current.pageSize).toEqual(25);
    expect(result.current.selectedFacets).toEqual({ theme: ["dkan"] });
    expect(result.current.page).toEqual(2);
    expect(result.current.fulltext).toEqual("react");
    expect(result.current.sort).toEqual("alpha");
    expect(result.current.sortOrder).toEqual("foobar");
  });
});
