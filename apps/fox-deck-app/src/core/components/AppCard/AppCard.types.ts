import type {AppButtonProps} from "@/core/components/AppButton/AppButton.types";

export type AppCardAction = AppButtonProps;
export type AppCardActions = AppCardAction[];

export type AppCardProps = {
  imageUrl?: string;
  imageAlt?: string;
  headline?: string;
  subhead?: string;
  supportingText?: string;
  actions?: AppCardActions;
}