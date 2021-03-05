import { transformDatastoreQueryToURL, transformURLtoDatastoreQuery} from './urlQuery';

describe('url to json', () => {
  test('url works without ?', async () => {
    expect(transformURLtoDatastoreQuery('my_column[conditions]=foobar')).toEqual({
      conditions: [{resource: 't', property: 'my_column', value: 'foobar', operator: '='}]
    })
  });
  test('basic url to JSON transform', async () => {
    expect(transformURLtoDatastoreQuery('?my_column[conditions]=foobar')).toEqual({
      conditions: [{resource: 't', property: 'my_column', value: 'foobar', operator: '='}]
    })
  });
  test('multiple conditions in url', async () => {
    expect(transformURLtoDatastoreQuery('?my_column[conditions]=foobar&your_column[conditions]=fizzbang')).toEqual({
      conditions: [
        {resource: 't', property: 'my_column', value: 'foobar', operator: '='},
        {resource: 't', property: 'your_column', value: 'fizzbang', operator: '='}
      ]
    })
  })
  test('single condition with operator change', async () => {
    expect(transformURLtoDatastoreQuery('?my_column[conditions]=foobar&my_column[operator]=LIKE')).toEqual({
      conditions: [
        {resource: 't', property: 'my_column', value: 'foobar', operator: 'LIKE'}
      ]
    })
  })
  test('multiple conditions with operator change', async () => {
    expect(transformURLtoDatastoreQuery('?my_column[conditions]=foobar&your_column[operator]=LIKE&my_column[operator]=LIKE&your_column[conditions]=fizzbang')).toEqual({
      conditions: [
        {resource: 't', property: 'my_column', value: 'foobar', operator: 'LIKE'},
        {resource: 't', property: 'your_column', value: 'fizzbang', operator: 'LIKE'}
      ]
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
  });
  test('multiple conditions to URL', async () => {
    const base = {
      conditions: [
        {
          resource: "t",
          property: "my_column",
          value: "foobar",
          operator: "="
        },
        {
          resource: "t",
          property: "your_column",
          value: "fizzbang",
          operator: "="
        }
      ]
    }
    expect(transformDatastoreQueryToURL(base)).toEqual('my_column[conditions]=foobar&your_column[conditions]=fizzbang')
  });
  test('multiple conditions to URL with different operator', async () => {
    const base = {
      conditions: [
        {
          resource: "t",
          property: "my_column",
          value: "foobar",
          operator: "LIKE"
        },
        {
          resource: "t",
          property: "your_column",
          value: "fizzbang",
          operator: ">"
        }
      ]
    }
    expect(transformDatastoreQueryToURL(base)).toEqual('my_column[conditions]=foobar&my_column[operator]=LIKE&your_column[conditions]=fizzbang&your_column[operator]=>')
  })
})