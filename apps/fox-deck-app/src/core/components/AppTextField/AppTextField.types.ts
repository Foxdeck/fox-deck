import {Icon} from "@/core/components/AppIcon/icons";

/**
 * The text-filed types are the material-design text-fields, which can be used.
 * The string matches the web-component's html tag.
 *
 * @example
 * <!-- material filled text field -->
 * <md-filled-text-field></md-filled-text-field>
 * <!-- material outlined text field -->
 * <md-outlined-text-field></md-outlined-text-field>
 */
export type AppTextFieldType = "md-filled-text-field" | "md-outlined-text-field";

/**
 * Definition of input types, which the TextField supports
 */
export type AppTextFieldInputType = "text" | "email" | "number" | "password" | "search" | "tel" | "url" | "textarea";

/**
 * Definition of TextField variants, which the TextField supports
 */
export type AppTextFieldVariant = "filled" | "outlined";

/**
 * Where the icon of the TextField should be, if an icon is rendered
 *
 * @property leading - the icon is at the start of the TextField
 * @property trailing - the icon is at the end of the TextField
 */
export type AppTextFieldIconPosition = "leading" | "trailing";

/**
 * Property definitions of the TextField.
 */
export type AppTextFieldProps = {
    modelValue?: string;
    readonly variant?: AppTextFieldVariant;
    readonly label?: string;
    readonly placeholder?: string;
    readonly type?: AppTextFieldInputType;
    readonly error?: boolean;
    readonly errorText?: string;
    readonly icon?: Icon;
    readonly iconPosition?: AppTextFieldIconPosition
    readonly supportingText?: string;
    readonly name?: string;
}