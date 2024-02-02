import { LinkProps } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";

export const Link = ({
  ...props /* Spread props to allow for StaticImage specific props StaticImageProps e.g. "height". */
}: LinkProps): JSX.Element => {
  return <Link {...props} />;
};
