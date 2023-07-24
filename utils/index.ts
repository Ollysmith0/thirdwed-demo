export function identifyDuplicates(
  data: Object[],
  key: string,
  unique: boolean = true
) {
  const uniqueArr: Object[] = [];
  const duplicates = data.filter((x) => {
    if (
      uniqueArr.length > 0 &&
      uniqueArr?.find(
        (u) => u[key as keyof typeof u] == x[key as keyof typeof x]
      ) != null
    ) {
      return true;
    }
    uniqueArr.push(x);
    return false;
  });
  return unique ? uniqueArr : duplicates;
}
