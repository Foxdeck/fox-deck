import {Icon} from "@/core/components/AppIcon/icons";

/**
 * Property definitions of the menu-items.
 */
export type AppMenuItemProps = {
  label?: string;
  icon?: Icon;
}

/**
 * Property definitions of the menu.
 */
export type AppMenuProps = {
  items: AppMenuItemProps[];
}