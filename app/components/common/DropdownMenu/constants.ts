import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { ListItemTextProps } from "@mui/material";

export const LIST_ITEM_TEXT_PROPS: ListItemTextProps = {
  primaryTypographyProps: { variant: TYPOGRAPHY_PROPS.VARIANT.BODY_500 },
  secondaryTypographyProps: {
    variant: TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400_2_LINES,
  },
};
