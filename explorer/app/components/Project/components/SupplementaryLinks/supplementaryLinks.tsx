// Core dependencies
import { Typography } from "@mui/material";
import React, { Fragment } from "react";

// App dependencies
import { SupplementaryLink } from "../../common/entities";
import { Stack } from "../../../common/Stack/Stack";
import { ANCHOR_TARGET, Link } from "../../../Links/components/Link/link";
import { SectionDetailsEmpty } from "../Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { Section } from "../Section/section";

// Styles
import {
  Marker,
  SupplementaryLink as EllipsisLink,
  SupplementaryList,
} from "./supplementaryLinks.styles";

interface Props {
  supplementaryLinks?: SupplementaryLink[];
}

export const SupplementaryLinks = ({
  supplementaryLinks,
}: Props): JSX.Element => {
  return (
    <Section collapsable title="Supplementary Links">
      {supplementaryLinks ? (
        <Stack gap={2}>
          <Typography>
            Supplementary links are provided by contributors and represent items
            such as additional data which can’t be hosted here; code that was
            used to analyze this data; or tools and visualizations associated
            with this specific dataset.
          </Typography>
          <SupplementaryList>
            {supplementaryLinks.map((link, marker) => (
              <Fragment key={link}>
                <Marker>{marker + 1}.</Marker>
                <EllipsisLink>
                  <Link
                    copyable
                    label={link}
                    noWrap
                    target={ANCHOR_TARGET.BLANK}
                    url={link}
                  />
                </EllipsisLink>
              </Fragment>
            ))}
          </SupplementaryList>
        </Stack>
      ) : (
        <SectionDetailsEmpty />
      )}
    </Section>
  );
};
