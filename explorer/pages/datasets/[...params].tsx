// Core dependencies
import React from "react";

// App dependencies
import { Page } from "../../app/components/Layout/components/Page/page";
import { config } from "../../app/config/config";
import { getCurrentEntity } from "../../app/hooks/useCurrentEntity";
import { Project } from "../../app/views/Project/project";

/**
 * WIP dataset detail page. TODO revisit - is this configurable?
 * @returns Element rendered as dataset detail page.
 */
const DatasetPage = (): JSX.Element => {
  const entity = getCurrentEntity("datasets", config());
  return (
    <Page entity={entity}>
      <Project />
    </Page>
  );
};

export default DatasetPage;
