import React, { Fragment } from "react";
import { Override } from "../../../../viewModelBuilders/common/entities";
import { ENTITY_STATUS } from "./common/entities";
import { EntityDeprecated } from "./components/EntityDeprecated/entityDeprecated";
import { EntityWithdrawn } from "./components/EntityWithdrawn/entityWithdrawn";

interface EntityGuardProps {
  override: Override;
}

export const EntityGuard = ({ override }: EntityGuardProps): JSX.Element => {
  const viewMode = getEntityViewMode(override);
  return (
    <Fragment>
      {viewMode === ENTITY_STATUS.DEPRECATED && (
        <EntityDeprecated override={override} />
      )}
      {viewMode === ENTITY_STATUS.WITHDRAWN && (
        <EntityWithdrawn override={override} />
      )}
    </Fragment>
  );
};

/**
 * Return the view mode for the entity, depending on its current status.
 * @param override - Override.
 * @returns view mode.
 */
function getEntityViewMode(override: Override): ENTITY_STATUS {
  if (override.deprecated) {
    return ENTITY_STATUS.DEPRECATED;
  }
  if (override.withdrawn) {
    return ENTITY_STATUS.WITHDRAWN;
  }
  return ENTITY_STATUS.LIVE;
}
