import axios from "axios";
import { renderHook, act } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
import useDatastore from "./";

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

describe("useDatastore Custom Hook", () => {
  test("returns data from datastore query endpoint with distribution id", async () => {
    axios.get.mockImplementation(() => Promise.resolve(data));
    const { result } = renderHook(() =>
      useDatastore(distribution.identifier, rootUrl, {})
    );
    await act(async () => {});
    expect(result.current.values).toEqual(data.data.results);
    expect(result.current.limit).toEqual(20);
    expect(result.current.offset).toEqual(0);
    expect(result.current.count).toEqual("1");
    expect(result.current.columns).toEqual([
      "record_id",
      "column_1",
      "column_2",
    ]);
    await act(async () => {
      result.current.setLimit(100);
    });
    expect(result.current.limit).toEqual(100);
    await act(async () => {
      result.current.setOffset(25);
    });
    expect(result.current.offset).toEqual(25);
  });
  test("returns data from datastore query endpoint with dataset id", async () => {
    axios.get.mockImplementation(() => Promise.resolve(data));
    const { result } = renderHook(() =>
      useDatastore([distribution.identifier, 0], rootUrl, {})
    );
    await act(async () => {});
    expect(result.current.values).toEqual(data.data.results);
    expect(result.current.limit).toEqual(20);
    expect(result.current.offset).toEqual(0);
    expect(result.current.count).toEqual("1");
    expect(result.current.columns).toEqual([
      "record_id",
      "column_1",
      "column_2",
    ]);
    await act(async () => {
      result.current.setLimit(100);
    });
    expect(result.current.limit).toEqual(100);
    await act(async () => {
      result.current.setOffset(25);
    });
    expect(result.current.offset).toEqual(25);
  });
});
