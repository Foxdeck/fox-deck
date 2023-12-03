/**
 * Represents an item in the dropdown field.
 */
export type FDDropdownItem = {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly icon?: string;
};