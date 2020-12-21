export function transformTableSortToQuerySort(sortArray) {
  let newQuery = {
    asc: [],
    desc: [],
  }
  sortArray.forEach((s) => {
    if (s.desc) {
      return newQuery.desc.push(s.id)
    } else {
      return newQuery.asc.push(s.id)
    }
  })
  return newQuery;
}