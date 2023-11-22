import { describe, expect, it } from "vitest";
import { MathUtil } from "@/core/util/math.util";

describe("MathUtil", () => {
  describe("random", () => {
    it("should return a random number 1", () => {
      const random = MathUtil.random(1, 1);

      expect(random).toEqual(1);
    });
  });

  describe("range", () => {
    it("should return a range from 1 to 5", () => {
      const range = MathUtil.range(5, 1);

      expect(range).toEqual([1, 2, 3, 4, 5]);
    });

    it("should return a range from 3 to 7", () => {
      const range = MathUtil.range(5, 3);

      expect(range).toEqual([3, 4, 5, 6, 7]);
    });
  });
});
