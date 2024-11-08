import { SectionTitle } from "@databiosphere/findable-ui/lib/components/common/Section/components/SectionTitle/sectionTitle";
import { TEXT_BODY_400 } from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Grid2, Typography } from "@mui/material";
import { NetworkIcon } from "../../../../../common/NetworkIcon/networkIcon";
import { StyledSection } from "./atlasSection.styles";
import { GRID_PROPS } from "./constants";
import { Atlas } from "./types";

interface AtlasProps {
  atlases: Atlas[];
}

export const AtlasSection = ({ atlases }: AtlasProps): JSX.Element => {
  return (
    <StyledSection>
      <Grid2 {...GRID_PROPS.COLUMN} spacing={4}>
        <SectionTitle title="Atlas" />
        <Grid2 {...GRID_PROPS.COLUMN} spacing={2}>
          {atlases.length > 0 ? (
            atlases.map(({ atlasName, networkKey }, i) => (
              <Grid2 key={i} alignItems="center" container spacing={2}>
                <NetworkIcon networkKey={networkKey} />
                <Typography variant={TEXT_BODY_400}>{atlasName}</Typography>
              </Grid2>
            ))
          ) : (
            <Typography variant={TEXT_BODY_400}>None</Typography>
          )}
        </Grid2>
      </Grid2>
    </StyledSection>
  );
};
