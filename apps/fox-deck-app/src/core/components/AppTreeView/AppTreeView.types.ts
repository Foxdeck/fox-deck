import type {AppTreeViewItemProps} from "@/core/components/AppTreeViewItem/AppTreeViewItem.types";

/**
 * Property definitions of the TreeView.
 */
export type AppTreeViewProps = {
  items: AppTreeViewItemProps[];
  isLoading?: boolean;
}