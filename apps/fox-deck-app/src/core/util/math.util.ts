export const MathUtil = {
  /**
   * Generate a random number between two numbers
   * @param min {number} the minimum number
   * @param max {number} the maximum number
   */
  random: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  /**
   * Creates an array of numbers.
   * @param size {number} the size the array should have
   * @param startAt {number} the start point of the generation
   * @example
   * MathUtil.range(5, 1) // [1,2,3,4,5]
   * MathUtil.range(5, 3) // [3,4,5,6,7]
   */
  range: (size: number, startAt: number): number[] => {
    return [...Array(size).keys()].map((i) => i + startAt);
  },
};
