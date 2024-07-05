import {describe, expect, it} from "vitest";

import {ObjectUtil} from "@/core/util/object.util";

describe("ObjectUtil", () => {
  describe("deepEqual", () => {
    it("should return true", () => {
      const object1 = {
        my: {
          nested: "object"
        },
        someString: "foo"
      };
      const object2 = {
        someString: "foo",
        my: {
          nested: "object"
        }
      };
      const isEqual = ObjectUtil.deepEqual(object1, object2);

      expect(isEqual).toBeTruthy();
    });

    it("should return false", () => {
      const object1 = {
        someString: "foo"
      };
      const object2 = {
        someString: "foo",
        my: {
          nested: "object"
        }
      };
      const isEqual = ObjectUtil.deepEqual(object1, object2);

      expect(isEqual).toBeFalsy();
    });

  });
});
