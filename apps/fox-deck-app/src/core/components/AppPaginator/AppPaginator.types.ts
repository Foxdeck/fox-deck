import {Icon} from "@/core/components/AppIcon/icons";

/**
 * Property definitions of paginator items.
 */
export type AppPaginatorItemProps = {
  isSelected?: boolean;
  label?: string;
  icon?: Icon
}

/**
 * Property definitions of paginator.
 */
export type AppPaginatorProps = {
  currentPage?: number;
  pages?: number
}