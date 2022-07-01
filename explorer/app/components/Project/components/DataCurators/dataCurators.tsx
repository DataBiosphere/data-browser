// Core dependencies
import React from "react";

// App dependencies
import { SectionDetailsEmpty } from "../Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { Section } from "../Section/section";

export type DataCurators = string[];

interface Props {
  dataCurators?: DataCurators;
}

export const DataCurators = ({ dataCurators }: Props): JSX.Element => {
  return (
    <Section collapsable title="Data Curators">
      {dataCurators ? (
        <div>
          {dataCurators.map((name, n) => (
            <div key={`${name}${n}`}>{name}</div>
          ))}
        </div>
      ) : (
        <SectionDetailsEmpty />
      )}
    </Section>
  );
};
