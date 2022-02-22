import { transformTableFilterToQueryCondition } from './transformConditions';

describe('transformTableFilterToQueryCondition', () => {
  test('transform an array from of filters from React Table into DKAN query format', async () => {
    const testArray1 = [{ id: 'my_label', value: 'abcd' }];
    const testArray2 = [
      { id: 'my_label', value: 'abcd' },
      { id: 'another_label', value: '1234' }
    ];

    expect(transformTableFilterToQueryCondition(testArray1)).toEqual([
      { resource: 't', property: 'my_label', value: '%abcd%', operator: 'LIKE' }
    ]);
    expect(transformTableFilterToQueryCondition(testArray2)).toEqual([
      { resource: 't', property: 'my_label', value: '%abcd%', operator: 'LIKE' },
      { resource: 't', property: 'another_label', value: '%1234%', operator: 'LIKE' }
    ]);
  });
});
