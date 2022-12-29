export function orderArray<T>(array: T[]): T[] {
  return array.sort((a: any, b: any) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    // a must be equal to b
    return 0
  })
};
