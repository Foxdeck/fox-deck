import type {Icon} from "@/core/components/AppIcon/icons";

/**
 * The variants can be used to define, which kind of buttons the application supports.
 */
export type AppButtonVariant = "tonal" | "outlined" | "text" | "plain";

/**
 * The size property is used to control the size of the button and scales with density. The default size is undefined
 * which essentially translates to medium.
 */
export type AppButtonSize = undefined | "x-small" | "small" | "large" | "x-large";

/**
 * Use the rounded prop to control the border radius of a button.
 */
export type AppButtonRounded = undefined | "sm" | "lg" | "xl";


/**
 * Property definitions of the button.
 */
export type AppButtonProps = {
  label?: string;
  icon?: Icon;
  variant?: AppButtonVariant;
  block?: boolean;
  size?: AppButtonSize;
  rounded?: AppButtonRounded;
}