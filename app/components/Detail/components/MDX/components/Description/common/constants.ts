import { Link } from "../../../../../../Layout/components/Content/components/Link/link";
import { Table } from "../../Table/table";
import { H1, H2, H3, H4, P } from "./../description.styles";

/**
 * Components used when rendering MDX content in Description. Note when
 * generalizing this constant, description styles also need to be generalized.
 */
export const MDX_COMPONENTS = {
  a: Link,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  table: Table,
};
