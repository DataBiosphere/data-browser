// Core dependencies
import { Typography } from "@mui/material";
import React, { Fragment } from "react";

// App dependencies
import {
  Key,
  KeyValuePairs,
  KeyValues,
} from "../../../common/KeyValuePairs/keyValuePairs";
import { Stack } from "../../../common/Stack/Stack";
import { SectionDetailsEmpty } from "../Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { Section } from "../Section/section";

interface Props {
  keyValuePairs?: KeyValues;
}

/**
 * Wrapper element around the key.
 * @param props - Set of values accepted by this component as props.
 * @param props.children - Key component children.
 * @returns typography component with color "ink.light".
 */
function renderKey(props: { children: Key }): JSX.Element {
  return <Typography color="ink.light">{props.children}</Typography>;
}

export const Details = ({ keyValuePairs }: Props): JSX.Element => {
  return (
    <Section collapsable title="Project Details">
      {keyValuePairs ? (
        <KeyValuePairs
          KeyElType={renderKey}
          keyValuePairs={keyValuePairs}
          KeyValuesElType={Fragment}
          KeyValueElType={Stack}
        />
      ) : (
        <SectionDetailsEmpty />
      )}
    </Section>
  );
};
