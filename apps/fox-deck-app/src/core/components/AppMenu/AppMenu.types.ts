import {Icon} from "@/core/components/AppIcon/icons";

/**
 * Property definitions of the menu-items.
 */
export type AppMenuItemProps = {
  identifier: string;
  label?: string;
  icon?: Icon;
}

/**
 * Property definitions of the menu.
 */
export type AppMenuProps = {
  identifier: string;
  items: AppMenuItemProps[];
}

/**
 * Property definitions, if the user selects a menu action
 */
export type AppMenuItemOnMenuActionSelect = {
  // which item is clicked on the menu
  itemIdentifier: string
  // which action is triggered
  actionIdentifier: string
}