import axios from "axios";
import { act } from "@testing-library/react-hooks";
import { fetchDataFromQuery } from "./fetch";

jest.mock("axios");
jest.useFakeTimers();

const rootUrl = "http://dkan.com/api/1";
const data = {
  data: {
    results: [{ record_id: "1", column_1: "fizz", column_2: "dkan" }],
    count: "1",
    schema: {
      "1234-1234": {
        fields: {
          record_id: { type: "text", mysql_type: "text" },
          column_1: { type: "text", mysql_type: "text" },
          column_2: { type: "text", mysql_type: "text" },
        },
      },
    },
  },
};

const distribution = {
  identifier: "1234-1234",
  data: {
    downloadURL: `${rootUrl}/files/file.csv`,
    format: "csv",
    title: "Dist Title",
  },
};

describe("fetchDataFromQuery", () => {
  test("returns data from datastore query endpoint", async () => {
    axios.get.mockImplementation(() => Promise.resolve(data));
    const results = await fetchDataFromQuery(distribution.identifier, rootUrl, {
      keys: true,
      limit: 20,
      offset: 0,
      conditions: [],
      sorts: [],
      setValues: () => {},
      setCount: () => {},
      setColumns: () => {},
      setSchema: () => {},
    });
    await act(async () => {
      jest.runAllTimers();
    });

    expect(axios.get).toHaveBeenCalledWith(
      `${rootUrl}/datastore/query/1234-1234?keys=true&limit=20&offset=0`
    );

    expect(results.count).toEqual(data.data.count);
    expect(results.results).toEqual(data.data.results);
  });
  test("returns data from datastore query index endpoint", async () => {
    axios.get.mockImplementation(() => Promise.resolve(data));
    const results = await fetchDataFromQuery(
      [distribution.identifier, 0],
      rootUrl,
      {
        keys: true,
        limit: 20,
        offset: 0,
        conditions: [],
        sorts: [],
        setValues: () => {},
        setCount: () => {},
        setColumns: () => {},
        setSchema: () => {},
      }
    );
    await act(async () => {
      jest.runAllTimers();
    });

    expect(axios.get).toHaveBeenCalledWith(
      `${rootUrl}/datastore/query/1234-1234/0?keys=true&limit=20&offset=0`
    );

    expect(results.count).toEqual(data.data.count);
    expect(results.results).toEqual(data.data.results);
  });
});
