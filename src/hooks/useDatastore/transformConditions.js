// OPERATORS
// =
// <> not equal to
// BETWEEN
// IN
// NOT IN
// >=
// <=
// like

export function transformTableFilterToQueryCondition(filterArray) {
  const conditions = filterArray.map((f) => {
    return {
      resource: 't',
      property: f.id,
      value: `%${f.value}%`,
      operator: 'LIKE',
    }
  });
  return conditions;
}
