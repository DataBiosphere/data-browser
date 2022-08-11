import React from "react";
import { DataCurator } from "../../common/entities";
import { SectionDetailsEmpty } from "../Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { Section } from "../Section/section";

interface Props {
  dataCurators?: DataCurator[];
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
