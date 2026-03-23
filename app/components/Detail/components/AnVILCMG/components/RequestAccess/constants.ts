import {
  ButtonProps,
  ListItemTextProps,
  MenuProps,
  SvgIconProps,
} from "@mui/material";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

export const BUTTON_PROPS: ButtonProps = {
  color: "primary",
  variant: "contained",
};

export const LIST_ITEM_TEXT_PROPS: ListItemTextProps = {
  primaryTypographyProps: { variant: TYPOGRAPHY_PROPS.VARIANT.BODY_500 },
  secondaryTypographyProps: {
    variant: TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400_2_LINES,
  },
};

export const MENU_PROPS: Partial<MenuProps> = {
  variant: "menu",
};

export const SVG_ICON_PROPS: SvgIconProps = {
  fontSize: "small",
};
