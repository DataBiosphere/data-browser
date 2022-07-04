/**
 * Project detail page hero component comprising breadcrumbs, project title, project status and tabs.
 */

// Core dependencies
import React from "react";

// App dependencies
import { Stack } from "app/components/common/Stack/Stack";
import { Status, StatusBadge } from "../../../common/StatusBadge/statusBadge";
import { Title } from "../Title/title";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO breadcrumb type https://github.com/clevercanary/data-browser/issues/68
  breadcrumbs?: any;
  status?: Status;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO tab type https://github.com/clevercanary/data-browser/issues/120
  tabs?: any;
  title?: string;
}

export const Hero = ({
  breadcrumbs,
  status,
  tabs,
  title,
}: Props): JSX.Element => {
  return (
    <>
      {(breadcrumbs || title) && (
        <Stack gap={1}>
          {/* TODO project breadcrumbs https://github.com/clevercanary/data-browser/issues/68 */}
          {title && <Title title={title} />}
        </Stack>
      )}
      {status && (
        <Stack direction="row" gap={4}>
          <StatusBadge status={status} />
        </Stack>
      )}
      {tabs && (
        <>
          {/* TODO project tabs https://github.com/clevercanary/data-browser/issues/120 */}
        </>
      )}
    </>
  );
};
