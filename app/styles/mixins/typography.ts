import { css, SerializedStyles } from "@emotion/react";
import { ThemeProps } from "@databiosphere/findable-ui/lib/theme/types";

/**
 * Returns typography style for the given variant.
 * @param variant - Variant.
 * @returns Typography styles.
 */
export function typographyToCSS(
  variant: keyof ThemeProps["theme"]["typography"]
) {
  return (props: ThemeProps): SerializedStyles => {
    return css(props.theme.typography[variant]);
  };
}
