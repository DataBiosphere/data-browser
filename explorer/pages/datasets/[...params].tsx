import React from "react";
import { Page } from "../../app/components/Layout/components/Page/page";
import { config } from "../../app/config/config";
import { getCurrentEntity } from "../../app/hooks/useCurrentEntity";
import { BackPage } from "../../app/views/BackPage/backPage";

/**
 * WIP dataset detail page. TODO revisit - is this configurable?
 * @param props - TBD.
 * @returns Element rendered as dataset detail page.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- WIP for demo. TODO revisit.
const DatasetPage = (props: any): JSX.Element => {
  // TODO revisit and remove
  const tempGuard = config().entities.find(
    (entity) => entity.route === "datasets"
  );
  if (!tempGuard) {
    return <></>;
  }
  const entity = getCurrentEntity("datasets", config());
  return (
    <Page entity={entity}>
      <BackPage {...props} />
    </Page>
  );
};

export default DatasetPage;
