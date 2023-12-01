import {ArrayUtil} from "./array.util";

describe("ArrayUtil", () => {
  it("should return true if array contains only the specified element", () => {
    const myArray = ["hello"];

    const result = ArrayUtil.containsExact(myArray, "hello");
    expect(result).toBeTruthy();
  })

  it("should return true if array contains not only the specified element", () => {
    const myArray = ["hello", "world"];

    const result = ArrayUtil.containsExact(myArray, "hello");
    expect(result).toBeFalsy();
  })

  it("should return false if array contains not the specified element", () => {
    const myArray = ["world"];

    const result = ArrayUtil.containsExact(myArray, "hello");
    expect(result).toBeFalsy();
  })

  it("should return false if array is undefined", () => {
    const myArray = undefined;

    const result = ArrayUtil.containsExact(myArray, "hello");
    expect(result).toBeFalsy();
  })
})