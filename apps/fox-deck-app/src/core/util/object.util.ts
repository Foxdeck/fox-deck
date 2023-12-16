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
    for (let property in object1) {
      if (!object1.hasOwnProperty(property)) {
        continue;
      }

      if (!object2.hasOwnProperty(property)) {
        return false;
      }

      if (object1[property] === object2[property]) {
        continue;
      }
      if (typeof (object1[property]) !== 'object') {
        return false;
      }
      if (!ObjectUtil.deepEqual(object1[property], object2[property])) {
        return false;
      }
    }

    for (let p in object2) {
      if (object2.hasOwnProperty(p) && !object1.hasOwnProperty(p)) {
        return false;
      }
    }
    return true;
  }
}
