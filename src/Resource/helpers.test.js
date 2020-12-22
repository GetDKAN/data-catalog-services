import { prepareColumns } from './helpers';

describe('prepareColumns', () => {
  test('transform an array into React Table columns', async () => {
    const testArray1 = ['my_column', 'column_2'];

    expect(prepareColumns(testArray1)).toEqual([
      {Header: 'my_column', accessor: 'my_column'},
      {Header: 'column_2', accessor: 'column_2'},
    ]);
  });
});