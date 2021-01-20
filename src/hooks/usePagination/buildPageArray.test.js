import { buildPageArray } from './buildPageArray';

describe('buildPageArray', () => {
  test('Only show start with filler and end', async () => {
    expect(buildPageArray(0, 2, 10)).toEqual([0, 1, 2, 3, 4, "filler", "end"]);
  });

  test('Show middle with start/end and filler on both sides of range', async () => {
    expect(buildPageArray(5, 2, 10)).toEqual(["start", "filler", 3, 4, 5, 6, 7, "filler", "end"]);
  });

  test('Only show last items with start and filler', async () => {
    expect(buildPageArray(9, 2, 10)).toEqual(["start", "filler", 7, 8, 9]);
  });
});
