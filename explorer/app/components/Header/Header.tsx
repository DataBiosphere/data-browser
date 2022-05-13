import React from "react";

interface HeaderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const Header = ({ children }: HeaderProps) => {
  return <header>{children}</header>;
};
