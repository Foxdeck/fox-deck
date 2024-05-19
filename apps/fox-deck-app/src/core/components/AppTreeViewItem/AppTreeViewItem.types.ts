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
 * Property definitions of the 'onItemSelect'-event.
 */
export type AppTreeViewItemOnItemSelect = {
  identifier: AppTreeViewItemIdentifier;
}

/**
 * Property definitions, if the user selects a menu action
 */
export type AppTreeViewItemOnMenuActionSelect = {
  // which item is clicked on the menu
  itemIdentifier: string
  // which action is triggered
  actionIdentifier: string
}