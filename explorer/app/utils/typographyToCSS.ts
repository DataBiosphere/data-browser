import {
  TEXT_BODY_400_2_LINES,
  TEXT_BODY_LARGE_500,
} from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { css, SerializedStyles } from "@emotion/react";

/**
 * Returns typography style for the specified typography variant.
 * TODO relocate to @clevercanary/data-explorer-ui.
 * @param TYPOGRAPHY - Typography variant name.
 * @returns typography styles for the variant.
 */
function typographyToCSS(TYPOGRAPHY: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO revisit any.
  return (props: any): SerializedStyles => {
    return css`
      ${props.theme.typography[TYPOGRAPHY]}
    `;
  };
}

export const textBody4002Lines = typographyToCSS(TEXT_BODY_400_2_LINES);
export const textBodyLarge500 = typographyToCSS(TEXT_BODY_LARGE_500);
