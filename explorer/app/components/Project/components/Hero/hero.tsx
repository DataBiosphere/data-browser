/**
 * Project detail page hero component comprising breadcrumbs, project title, project status and tabs.
 */

// Core dependencies
import React from "react";

// App dependencies
import {
  Breadcrumb,
  Breadcrumbs,
} from "../../../common/Breadcrumbs/breadcrumbs";
import { Status, StatusBadge } from "../../../common/StatusBadge/statusBadge";
import { HeroTitle, Title } from "../../../common/Title/title";
import { Stack } from "app/components/common/Stack/Stack";

interface Props {
  breadcrumbs?: Breadcrumb[];
  status?: Status;
  title?: HeroTitle;
}

export const Hero = ({ breadcrumbs, status, title }: Props): JSX.Element => {
  return (
    <>
      {(breadcrumbs || title) && (
        <Stack gap={1}>
          {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
          {title && <Title title={title} />}
        </Stack>
      )}
      {status && (
        <Stack direction="row" gap={4}>
          <StatusBadge status={status} />
        </Stack>
      )}
    </>
  );
};
