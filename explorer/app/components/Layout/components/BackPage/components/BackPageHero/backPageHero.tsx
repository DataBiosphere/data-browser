/**
 * Back page hero component comprising breadcrumbs, title, status and tabs.
 */

import { Stack } from "app/components/common/Stack/Stack";
import React, { Fragment } from "react";
import {
  Breadcrumb,
  Breadcrumbs,
} from "../../../../../common/Breadcrumbs/breadcrumbs";
import { CallToActionButton as CTAButtonProps } from "../../../../../common/Button/common/entities";
import {
  Status,
  StatusBadge,
} from "../../../../../common/StatusBadge/statusBadge";
import { HeroTitle, Title } from "../../../../../common/Title/title";
import {
  BackPageHeroHeadline,
  CallToActionButton,
} from "./backPageHero.styles";

interface Props {
  breadcrumbs?: Breadcrumb[];
  callToAction?: CTAButtonProps;
  status?: Status;
  title?: HeroTitle;
}

export const BackPageHero = ({
  breadcrumbs,
  callToAction,
  status,
  title,
}: Props): JSX.Element => {
  const HeroHeadline = callToAction ? BackPageHeroHeadline : Fragment;
  return (
    <>
      {(breadcrumbs || title) && (
        <HeroHeadline>
          <Stack gap={1}>
            {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
            {title && <Title title={title} />}
          </Stack>
          {callToAction && (
            <CallToActionButton
              callToAction={callToAction}
              row={status ? 3 : 2}
            />
          )}
        </HeroHeadline>
      )}
      {status && (
        <Stack direction="row" gap={4}>
          <StatusBadge status={status} />
        </Stack>
      )}
    </>
  );
};
