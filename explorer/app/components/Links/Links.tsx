import React from "react";
import { Link as ILink } from "./common/entities";
import { Link } from "./components/Link/link";

interface Props {
  links: ILink[];
}

export const Links = ({ links }: Props): JSX.Element => {
  return (
    <>
      {links.map(({ copyable, label, noWrap, target, url }) => (
        <Link
          key={url}
          copyable={copyable}
          label={label}
          noWrap={noWrap}
          target={target}
          url={url}
        />
      ))}
    </>
  );
};
