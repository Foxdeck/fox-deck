/**
 * This function contains other utility function for working with arrays.
 */
export const ArrayUtil = {
  /**
   * Checks if only a specific item is inside an array.
   *
   * @example
   * const visibility = ["public", "private"];
   * ArrayUtil.containsExact(myArray, "public"); // returns false, because not only "Hello" is inside the array
   *
   * const visibility = ["public"];
   * ArrayUtil.containsExact(myArray, "public"); // returns true, because only "Hello" is inside the array
   */
  containsExact: <T> (arr: T[], item: T): boolean => {
    return arr !== undefined && arr.every((element) => element === item)
  }
}