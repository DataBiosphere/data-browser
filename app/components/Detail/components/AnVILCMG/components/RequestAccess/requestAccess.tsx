import { JSX } from "react";
import { Props } from "./types";
import { ListItemText, MenuItem } from "@mui/material";
import { Actions } from "@databiosphere/findable-ui/lib/components/Layout/components/BackPage/components/BackPageHero/components/Actions/actions";
import { CallToActionButton } from "@databiosphere/findable-ui/lib/components/common/Button/components/CallToActionButton/callToActionButton";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { StyledButton, StyledDropdownMenu } from "./requestAccess.styles";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import {
  BUTTON_PROPS,
  LIST_ITEM_TEXT_PROPS,
  MENU_PROPS,
  SVG_ICON_PROPS,
} from "./constants";
import { getRequestAccessOptions } from "./utils";

export const RequestAccess = ({
  datasetsResponse,
}: Props): JSX.Element | null => {
  const options = getRequestAccessOptions(datasetsResponse);
  // If there are no request access options, return null.
  if (options.length === 0) return null;
  // If there is only one request access option, render a CallToActionButton.
  if (options.length === 1)
    return (
      <Actions>
        <CallToActionButton
          callToAction={{ label: "Request Access", url: options[0].href }}
        />
      </Actions>
    );
  // Otherwise, render a dropdown menu for multiple request access options.
  return (
    <Actions>
      <StyledDropdownMenu
        {...MENU_PROPS}
        button={(props) => (
          <StyledButton
            {...BUTTON_PROPS}
            endIcon={<ArrowDropDownRoundedIcon {...SVG_ICON_PROPS} />}
            {...props}
          >
            Request Access
          </StyledButton>
        )}
      >
        {({ closeMenu }): JSX.Element[] => [
          ...options.map(({ href, primary, secondary }, i) => (
            <MenuItem
              key={i}
              component="a"
              href={href}
              rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
              target={ANCHOR_TARGET.BLANK}
              onClick={closeMenu}
            >
              <ListItemText
                {...LIST_ITEM_TEXT_PROPS}
                primary={primary}
                secondary={secondary}
              />
            </MenuItem>
          )),
        ]}
      </StyledDropdownMenu>
    </Actions>
  );
};
