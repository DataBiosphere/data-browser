import { SectionTitle } from "@databiosphere/findable-ui/lib/components/common/Section/components/SectionTitle/sectionTitle";
import { TEXT_BODY_400 } from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Grid, Typography } from "@mui/material";
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
      <Grid {...GRID_PROPS.COLUMN} spacing={4}>
        <SectionTitle title="Atlas" />
        <Grid {...GRID_PROPS.COLUMN} spacing={2}>
          {atlases.length > 0 ? (
            atlases.map(({ atlasName, networkKey }, i) => (
              <Grid key={i} alignItems="center" container spacing={2}>
                <NetworkIcon networkKey={networkKey} />
                <Typography variant={TEXT_BODY_400}>{atlasName}</Typography>
              </Grid>
            ))
          ) : (
            <Typography variant={TEXT_BODY_400}>None</Typography>
          )}
        </Grid>
      </Grid>
    </StyledSection>
  );
};
