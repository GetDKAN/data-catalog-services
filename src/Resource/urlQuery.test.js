import { transformDatastoreQueryToURL, transformURLtoDatastoreQuery} from './urlQuery';

describe('url to json', () => {
  test('basic url to JSON transform', async () => {
    expect(transformURLtoDatastoreQuery('?my_column[conditions]=foobar')).toEqual({
      conditions: [{resource: 't', property: 'my_column', value: 'foobar', operator: '='}]
    })
  })
})

describe('json to url', () => {
  test('basic JSON to url transform', async () => {
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