import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { Container } from "./NavLinks.styles";

export interface NavLinkItem {
  label: string;
  url: string;
}

export interface NavLinksProps {
  links: NavLinkItem[];
}

export const NavLinks = ({ links }: NavLinksProps): JSX.Element => {
  return (
    <Container>
      {links.map((link) => (
        <Link key={link.url} href={link.url} passHref>
          <Typography component="a" variant="text-body-500">
            {link.label}
          </Typography>
        </Link>
      ))}
    </Container>
  );
};
