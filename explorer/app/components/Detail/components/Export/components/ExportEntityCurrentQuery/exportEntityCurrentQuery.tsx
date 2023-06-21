import { Filters } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { SectionTitle } from "@clevercanary/data-explorer-ui/lib/components/common/Section/components/SectionTitle/sectionTitle";
import { GridPaperSection } from "@clevercanary/data-explorer-ui/lib/components/common/Section/section.styles";
import { useDetailState } from "@clevercanary/data-explorer-ui/lib/hooks/useDetailState";
import React, { Fragment } from "react";
import { CategoryKeyLabel } from "../../../../../../viewModelBuilders/common/utils";
import { Label, Values } from "./exportEntityCurrentQuery.styles";

interface CurrentQuery {
  label: string;
  values: string[];
}

export interface ExportEntityCurrentQueryProps {
  categoryKeyLabel: CategoryKeyLabel;
  currentQuery?: CurrentQuery; // Configured current query; comprising entity label and value.
  entityIdKey?: string; // entityIdKey for removal of entityId from current query display.
}

export const ExportEntityCurrentQuery = ({
  categoryKeyLabel,
  currentQuery,
  entityIdKey,
}: ExportEntityCurrentQueryProps): JSX.Element => {
  const { exportFilters } = useDetailState();
  const queries = getCurrentQueries(
    exportFilters,
    categoryKeyLabel,
    currentQuery,
    entityIdKey
  );
  return (
    <GridPaperSection>
      <SectionTitle title="Current Query" />
      {queries.length > 0 ? (
        queries.map(({ label, values }) => (
          <div key={label}>
            <Label>{label}</Label>
            <Values>
              {values.map((value, i) => (
                <Fragment key={`${value}${i}`}>
                  {i > 0 && <code>OR</code>}
                  <span>{value}</span>
                </Fragment>
              ))}
            </Values>
          </div>
        ))
      ) : (
        <Values>None</Values>
      )}
    </GridPaperSection>
  );
};

/**
 * Returns current queries for the given selected export filters.
 * If specified:
 * - entityIdKey filters the entity identifier from selected export filters, and
 * - currentQuery adds the entity label and value to the current query display.
 * @param exportFilters - Selected filters for export.
 * @param categoryKeyLabel - Map of category keys to labels.
 * @param currentQuery - Current query comprising entity label and values.
 * @param entityIdKey - Entity identifier key.
 * @returns current queries.
 */
function getCurrentQueries(
  exportFilters: Filters,
  categoryKeyLabel: CategoryKeyLabel,
  currentQuery?: CurrentQuery,
  entityIdKey?: string
): CurrentQuery[] {
  const queries: CurrentQuery[] = [];
  if (currentQuery) {
    queries.push(currentQuery);
  }
  exportFilters
    .filter(({ categoryKey }) => categoryKey !== entityIdKey)
    .forEach(({ categoryKey, value }) => {
      queries.push({
        label: categoryKeyLabel.get(categoryKey) || categoryKey,
        values: value,
      });
    });
  return queries;
}
