import React from "react";

interface FooterProps {
  children: React.ReactNode | React.ReactNode[];
}

export const Footer = ({ children }: FooterProps): JSX.Element => {
  return <footer>{children}</footer>;
};
