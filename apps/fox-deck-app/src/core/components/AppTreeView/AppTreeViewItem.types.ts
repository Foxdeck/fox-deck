export type AppTreeViewItemType = "document" | "folder";

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
}

/**
 * Property definitions of the 'onItemSelect'-event.
 */
export type AppTreeViewItemOnItemSelect = {
  identifier: AppTreeViewItemIdentifier;
}