export const ObjectUtil = {
  /**
   * This method checks if two objects are deeply equal.
   * It compares their properties recursively and returns true if they are equal, false otherwise.
   *
   * @param {any} object1 - The first object to compare.
   * @param {any} object2 - The second object to compare.
   * @return {boolean} - True if the objects are deeply equal, false otherwise.
   */
  deepEqual: (object1: any, object2: any): boolean => {
    for (const property in object1) {
      if (!Object.prototype.hasOwnProperty.call(object1, property)) {
        continue;
      }

      if (!Object.prototype.hasOwnProperty.call(object2, property)) {
        return false;
      }

      if (object1[property] === object2[property]) {
        continue;
      }
      if (typeof (object1[property]) !== "object") {
        return false;
      }
      if (!ObjectUtil.deepEqual(object1[property], object2[property])) {
        return false;
      }
    }

    for (const p in object2) {
      if (Object.prototype.hasOwnProperty.call(object2, p) && !Object.prototype.hasOwnProperty.call(object1, p)) {
        return false;
      }
    }
    return true;
  }
};
