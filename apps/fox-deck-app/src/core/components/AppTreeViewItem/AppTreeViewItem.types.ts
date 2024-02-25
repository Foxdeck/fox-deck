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
  children?: AppTreeViewItemProps[];
}

/**
 * Property definitions of the 'onItemSelect'-event.
 */
export type AppTreeViewItemOnItemSelect = {
  identifier: AppTreeViewItemIdentifier;
}