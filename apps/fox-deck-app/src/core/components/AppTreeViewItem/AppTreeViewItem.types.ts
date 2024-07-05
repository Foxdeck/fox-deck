export type AppTreeViewItemType = "note" | "folder";

/**
 * Represents the identifier of an item in the AppTreeView.
 */
export type AppTreeViewItemIdentifier = string;

/**
 * Property definitions of the TreeViewItem.
 */
export type AppTreeViewItemProps = {
  identifier: AppTreeViewItemIdentifier;
  type: AppTreeViewItemType;
  isSelected?: boolean;
  isOpen?: boolean;
  label?: string;
  isLoading?: boolean;
  children?: AppTreeViewItemProps[];
}

/**
 * Represents the default event props for an `AppTreeViewItem`.
 * These properties are passed in every event.
 *
 * @property {AppTreeViewItemIdentifier} identifier - The identifier of the `AppTreeViewItem`.
 */
type AppTreeViewItemDefaultEventProps = {
  identifier: AppTreeViewItemIdentifier;
}

/**
 * Property definitions of the 'onItemSelect'-event.
 */
export type AppTreeViewItemOnItemSelect = AppTreeViewItemDefaultEventProps;

/**
 * Property definitions of the 'contextmenu'-event.
 */
export type AppTreeViewItemOnOpenContextMenu = AppTreeViewItemDefaultEventProps;