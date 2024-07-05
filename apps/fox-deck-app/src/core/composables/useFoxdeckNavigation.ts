import type {AppTreeViewItemProps} from "@/core/components/AppTreeViewItem/AppTreeViewItem.types";

export function useFoxdeckNavigation() {

  async function getTreeViewItems(): Promise<AppTreeViewItemProps[]> {
    // TODO: replace mock in the future
    const treeViewItems: AppTreeViewItemProps[] = [
      {
        identifier: "f-biology-1",
        label: "Biology",
        type: "folder",
        isOpen: true,
        children: [
          {
            identifier: "d-cell-biology",
            type: "note",
            label: "Cell Biology",
          },
          {
            identifier: "f-genetics-1",
            type: "folder",
            label: "Genetics",
            isOpen: true,
            children: [
              {
                identifier: "d-dna-structure",
                type: "note",
                label: "DNA Structure",
              },
              {
                identifier: "d-genetic-variation",
                type: "note",
                label: "Genetic Variation",
              }
            ]
          },
          {
            identifier: "d-ecology",
            isSelected: true,
            type: "note",
            label: "Ecology",
          }
        ]
      },
      {
        identifier: "f-math-1",
        label: "Mathematics",
        type: "folder",
        isOpen: true,
        children: [
          {
            identifier: "f-algebra-1",
            type: "folder",
            label: "Algebra",
            isOpen: false,
          },
          {
            identifier: "d-geometry",
            type: "note",
            label: "Geometry",
          }
        ]
      },
      {
        identifier: "f-history-1",
        label: "History",
        type: "folder",
        isOpen: true,
        children: [
          {
            identifier: "d-world-war-1",
            type: "note",
            label: "World War I",
          },
          {
            identifier: "d-world-war-2",
            type: "note",
            label: "World War II",
          }
        ]
      },
      {
        identifier: "d-todo-1",
        label: "To-Do List",
        type: "note"
      }
    ];

    return treeViewItems;
  }

  /**
     * Public API
     */
  return {
    getTreeViewItems: getTreeViewItems
  };
}