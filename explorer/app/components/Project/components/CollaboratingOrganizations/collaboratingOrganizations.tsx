// Core dependencies
import React from "react";

// App dependencies
import { CollaboratingOrganization } from "../../common/entities";
import { SectionDetailsEmpty } from "../Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { Section } from "../Section/section";

// Styles
import { Sup } from "../../../Citations/Citations.styles";

interface Props {
  collaboratingOrganizations?: CollaboratingOrganization[];
}

export const CollaboratingOrganizations = ({
  collaboratingOrganizations,
}: Props): JSX.Element => {
  return (
    <Section collapsable title="Collaborating Organizations">
      {collaboratingOrganizations ? (
        <div>
          {collaboratingOrganizations.map(({ citation, name }, c) => (
            <div key={`${name}${c}`}>
              <Sup>{citation}</Sup>
              <span>{name}</span>
            </div>
          ))}
        </div>
      ) : (
        <SectionDetailsEmpty />
      )}
    </Section>
  );
};
