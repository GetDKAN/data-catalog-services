import { transformDatastoreQueryToURL, transformURLtoDatastoreQuery} from './urlQuery';
// expect(prepareColumns(testArray1)).toEqual([
//   {Header: 'my_column', accessor: 'my_column'},
//   {Header: 'column_2', accessor: 'column_2'},
// ]);


describe('url to json', () => {
  test('blha', async () => {
    expect(transformURLtoDatastoreQuery('?my_column[conditions]=foobar&my_column[operator]=LIKE')).toEqual({
      conditions: [{resource: 't', property: 'my_column', value: 'foobar', operator: '='}]
    })
  })
})

describe('json to url', () => {
  test('blha', async () => {
    const base = {
      conditions: [
        {
          resource: "t",
          property: "my_column",
          value: "foobar",
          operator: "="
        }
      ]
    }
    expect(transformDatastoreQueryToURL(base)).toEqual('my_column[conditions]=foobar')
  })
})