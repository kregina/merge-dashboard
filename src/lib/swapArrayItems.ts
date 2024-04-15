export const swapArrayItems = <T>(
  arr: T[],
  fromIndex: number,
  toIndex: number,
): T[] => {
  const copy = [...arr];

  const temp = copy[fromIndex];
  copy[fromIndex] = copy[toIndex];
  copy[toIndex] = temp;

  return copy;
};
