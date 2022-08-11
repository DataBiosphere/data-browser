import React from "react";
import { Contributor } from "../../common/entities";
import { SectionDetailsEmpty } from "../Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { Section } from "../Section/section";
import { Sup } from "../Sup/Sup.styles";

interface Props {
  contributors?: Contributor[];
}

export const Contributors = ({ contributors }: Props): JSX.Element => {
  return (
    <Section collapsable title="Contributors">
      {contributors ? (
        <div>
          {contributors.map(({ citation, name, role }, c) => (
            <div key={`${name}${c}`}>
              <span>{name}</span>
              {role && <span> ({role})</span>}
              {citation && <Sup>{citation}</Sup>}
            </div>
          ))}
        </div>
      ) : (
        <SectionDetailsEmpty />
      )}
    </Section>
  );
};
