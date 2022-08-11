/**
 * Project detail page hero component comprising breadcrumbs, project title, project status and tabs.
 */

import { Stack } from "app/components/common/Stack/Stack";
import React from "react";
import {
  Breadcrumb,
  Breadcrumbs,
} from "../../../common/Breadcrumbs/breadcrumbs";
import { Status, StatusBadge } from "../../../common/StatusBadge/statusBadge";
import { HeroTitle, Title } from "../../../common/Title/title";

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
