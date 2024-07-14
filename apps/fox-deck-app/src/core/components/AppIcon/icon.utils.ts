import {Icon} from "@/core/components/AppIcon/icons";
import type {AppTreeViewItemType} from "@/core/components/AppTreeViewItem/AppTreeViewItem.types";

/**
 * Returns the appropriate icon based on the open state.
 *
 * @param {boolean} isOpen - Indicates whether the state is open or not.
 * @return {Icon} - The icon representing the open state.
 */
export function getOpenStateIcon(isOpen: boolean): Icon {
  return isOpen ? Icon.CARET_DOWN : Icon.CARET_RIGHT;
}

/**
 * Returns the appropriate icon for a resource based on its type, open state, and selection state.
 *
 * @param {AppTreeViewItemType} type - The type of the resource.
 * @param {boolean} isOpen - Indicates whether the resource is currently open.
 * @param {boolean} isSelected - Indicates whether the resource is currently selected.
 * @returns {Icon|undefined} - The appropriate icon for the resource, or undefined if there is no matching icon.
 */
export function getResourceIcon(
  type: AppTreeViewItemType,
  isOpen: boolean,
  isSelected: boolean
): Icon | undefined {
  if (type === "note") {
    if (isSelected) {
      return Icon.DOCUMENT_FILLED;
    }
    return Icon.DOCUMENT;
  }

  if (type === "folder") {
    if (isOpen) return Icon.FOLDER_FILLED_OPEN;

    return Icon.FOLDER;
  }

  if (type === "favorite") {
    if (isOpen) return Icon.STAR_FILLED;

    return Icon.STAR;
  }

  if (type === "wastebasket") {
    if (isOpen) return Icon.WASTEBASKET_FILLED;

    return Icon.WASTEBASKET;
  }

  return undefined;
}