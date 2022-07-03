// Core dependencies
import { AppBar, Link, Toolbar } from "@mui/material";
import NLink from "next/link";
import React from "react";

// App dependencies
import { Socials } from "app/components/common/Socials/socials";
import { Footer as FooterProps } from "../../common/entities";
import { Stack } from "../../../common/Stack/Stack";
import { Logo } from "../Header/components/Logo/logo";

interface Props {
  footer: FooterProps;
}

export const Footer = ({ footer }: Props): JSX.Element => {
  const { feedbackForm, logos, navLinks, socials } = footer;
  return (
    <AppBar component="footer" color="inherit" variant="footer">
      <Toolbar
        sx={{ gap: 4, justifyContent: "space-between", minHeight: 56 }}
        variant="dense"
      >
        <Stack alignItems="center" direction="row" gap={6}>
          {logos.map((logo, l) => (
            <Logo key={`${logo.link}${l}`} logo={logo} />
          ))}
        </Stack>
        <Stack alignItems="stretch" direction="row" gap={6}>
          {navLinks.map(({ label, url }) => (
            <NLink key={label} href={url} passHref>
              <Link
                alignItems="center"
                color="ink"
                display="flex"
                variant="text-body-small-400"
              >
                {label}
              </Link>
            </NLink>
          ))}
          {feedbackForm && <>{/* TODO feedback form */}</>}
          <Socials buttonSize="small" socials={socials} sx={{ gap: 2 }} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
