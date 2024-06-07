import type {Icon} from "@/core/components/AppIcon/icons";

/**
 * The button types are the material-design buttons, which can be used.
 * The string matches the web-component's html tag.
 *
 * @example
 * <!-- material filled tonal button -->
 * <md-filled-tonal-button></md-filled-tonal-button>
 * <!-- material outlined button -->
 * <md-outlined-button></md-outlined-button>
 * <!-- material text button -->
 * <md-text-button></md-text-button>
 */
export type AppButtonType = "md-filled-tonal-button" | "md-outlined-button" | "md-text-button";

/**
 * The variants can be used to define, which kind of buttons the application supports.
 */
export type AppButtonVariant = "tonal" | "outlined" | "text";

/**
 * The severity of the button controls, in which color the button is rendered.
 */
export type AppButtonSeverity = "primary" | "danger";

/**
 * Defines the width of the button.
 *
 * @property block - The button takes up the minimum width required to display its content.
 * @property full - The button expands to take up the full width of its container.
 */
export type AppButtonWidth = "block" | "full";


/**
 * Property definitions of the button.
 */
export type AppButtonProps = {
  tooltip?: string;
  label?: string;
  icon?: Icon;
  variant?: AppButtonVariant;
  severity?: AppButtonSeverity;
  width?: AppButtonWidth;
  isLoading?: boolean;
}