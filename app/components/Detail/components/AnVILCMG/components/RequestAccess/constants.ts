import {
  ButtonProps,
  ListItemTextProps,
  MenuProps,
  SvgIconProps,
} from "@mui/material";
import {
  TEXT_BODY_500,
  TEXT_BODY_SMALL_400_2_LINES,
} from "@databiosphere/findable-ui/lib/theme/common/typography";

export const BUTTON_PROPS: ButtonProps = {
  color: "primary",
  variant: "contained",
};

export const LIST_ITEM_TEXT_PROPS: ListItemTextProps = {
  primaryTypographyProps: { variant: TEXT_BODY_500 },
  secondaryTypographyProps: { variant: TEXT_BODY_SMALL_400_2_LINES },
};

export const MENU_PROPS: Partial<MenuProps> = {
  variant: "menu",
};

export const SVG_ICON_PROPS: SvgIconProps = {
  fontSize: "small",
};
