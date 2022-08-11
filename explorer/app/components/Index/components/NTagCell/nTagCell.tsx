import { Chip, ChipProps, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import { MetadataValue } from "../../common/entities";
import { stringifyMetadataValues } from "../../common/utils";
import { NTag } from "../NTag/nTag";

// Template constants
const MAX_DISPLAYABLE_VALUES = 1;

interface Props {
  label: string;
  values: MetadataValue[];
}

/**
 * Renders tag for NTag component.
 * Tooltip children require forward ref.
 */
const Tag = forwardRef<HTMLDivElement, ChipProps>(function Tag(props, ref) {
  return <Chip ref={ref} {...props} />;
});

export const NTagCell = ({ label, values }: Props): JSX.Element => {
  const metadataCount = values.length;
  const showNTag = metadataCount > MAX_DISPLAYABLE_VALUES;
  return (
    <>
      {showNTag ? (
        <NTag
          Tag={<Tag label={`${metadataCount} ${label}`} variant="ntag" />}
          TooltipTitle={
            <Typography display="block" variant="text-body-small-400">
              {stringifyMetadataValues(values)}
            </Typography>
          }
        />
      ) : (
        values.map((value, v) => <div key={`${value}${v}`}>{value}</div>)
      )}
    </>
  );
};
