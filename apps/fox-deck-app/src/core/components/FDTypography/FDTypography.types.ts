/**
 * ARIA roles can be used to describe elements that don't natively exist in HTML or exist but don't yet have full browser support.
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
 */
export type AriaRole = "heading";

/**
 * The aria-level attribute defines the hierarchical level of an element within a structure.
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-level
 */
export type AriaLevel = 1 | 2 | 3;

/**
 * Defines the different font types fox-deck supports.
 */
export type FDFontType = "title" | "h1" | "h2" | "h3" | "p" | "pxs" | "psm";