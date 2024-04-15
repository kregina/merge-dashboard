import { describe, expect, it } from 'vitest';
import { swapArrayItems } from './swapArrayItems'; // Adjust the import path as needed

describe('swapArrayItems', () => {
  it('should swap two items in an array', () => {
    const originalArray = [1, 2, 3, 4];
    const fromIndex = 1;
    const toIndex = 2;
    const expectedArray = [1, 3, 2, 4];

    const result = swapArrayItems(originalArray, fromIndex, toIndex);

    expect(result).toEqual(expectedArray);
  });

  it('should not modify the original array', () => {
    const originalArray = [1, 2, 3, 4];
    const fromIndex = 1;
    const toIndex = 2;

    swapArrayItems(originalArray, fromIndex, toIndex);

    expect(originalArray).toEqual([1, 2, 3, 4]);
  });

  it('should handle swapping the same index', () => {
    const originalArray = [1, 2, 3, 4];
    const index = 2;
    const expectedArray = [1, 2, 3, 4];

    const result = swapArrayItems(originalArray, index, index);

    expect(result).toEqual(expectedArray);
  });
});
