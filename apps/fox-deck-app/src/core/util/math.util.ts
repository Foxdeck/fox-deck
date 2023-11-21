export const MathUtil = {
  /**
   * Generate a random number between two numbers
   * @param min {number} the minimum number
   * @param max {number} the maximum number
   */
  random: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
};
