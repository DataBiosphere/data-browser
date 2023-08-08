import { TagWarning } from "@clevercanary/data-explorer-ui/lib/components/common/Tag/tag.styles";
import {
  Link,
  LinkProps,
} from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import React from "react";

export const BatchCorrectionWarning = ({
  label,
  url,
}: LinkProps): JSX.Element => {
  return (
    <p>
      <TagWarning>Please note</TagWarning> Data normalization and batch
      correction may differ between projects and processing methods. For details
      see <Link label={label} url={url} />.
    </p>
  );
};
