/**
 * Represents an item in the radio button group.
 */
export type FDRadioGroupItem = {
  id: FDRadioGroupItemId;
  label: string;
  text: string;
  value: string;
};

export type FDRadioGroupItemId = string;

export type FDRadioGroupItems = FDRadioGroupItem[];
