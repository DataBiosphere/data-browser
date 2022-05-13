import React from "react";

interface FooterProps {
  children: React.ReactNode | React.ReactNode[];
}

export const Footer = ({ children }: FooterProps) => {
  return <footer>{children}</footer>;
};
