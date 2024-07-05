import {describe, expect, it} from "vitest";

import {getOpenStateIcon, getResourceIcon} from "@/core/components/AppIcon/icon.utils";
import {Icon} from "@/core/components/AppIcon/icons";

describe("getOpenStateIcon", () => {
  describe("when isOpen is true", () => {
    it("should return 'fi-rr-cared-down'", () => {
      expect(getOpenStateIcon(true)).toBe("fi-rr-caret-down");
    });
  });

  describe("when isOpen is false", () => {
    it("should return 'fi-rr-cared-down'", () => {
      expect(getOpenStateIcon(false)).toBe("fi-rr-caret-right");
    });
  });
});


describe("getResourceIcon", () => {
  it.each`
    type        | isOpen  | isSelected | expectedIcon
    ${"note"}   | ${true} | ${true}    | ${Icon.DOCUMENT_FILLED}
    ${"note"}   | ${true} | ${false}   | ${Icon.DOCUMENT}
    ${"note"}   | ${false}| ${true}    | ${Icon.DOCUMENT_FILLED}
    ${"note"}   | ${false}| ${false}   | ${Icon.DOCUMENT}
    ${"folder"} | ${true} | ${true}    | ${Icon.FOLDER_FILLED_OPEN}
    ${"folder"} | ${true} | ${false}   | ${Icon.FOLDER_FILLED_OPEN}
    ${"folder"} | ${false}| ${true}    | ${Icon.FOLDER}
    ${"folder"} | ${false}| ${false}   | ${Icon.FOLDER}
    ${"unknown"}| ${true} | ${true}    | ${undefined}
    ${"unknown"}| ${true} | ${false}   | ${undefined}
    ${"unknown"}| ${false}| ${true}    | ${undefined}
    ${"unknown"}| ${false}| ${false}   | ${undefined}
  `("returns $expectedIcon when type is $type, isOpen is $isOpen, and isSelected is $isSelected", ({ type, isOpen, isSelected, expectedIcon }) => {
    expect(getResourceIcon(type, isOpen, isSelected)).toBe(expectedIcon);
  });
});