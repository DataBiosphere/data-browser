import { Override } from "@databiosphere/findable-ui/lib/config/entities";
import Router from "next/router";
import { Fragment, JSX, useEffect } from "react";
import { ENTITY_STATUS } from "./common/entities";
import { EntityDeprecated } from "./components/EntityDeprecated/entityDeprecated";
import { EntityWithdrawn } from "./components/EntityWithdrawn/entityWithdrawn";

interface EntityGuardProps {
  override: Override;
}

export const EntityGuard = ({ override }: EntityGuardProps): JSX.Element => {
  const { duplicateOf } = override;
  const viewMode = getEntityViewMode(override);

  // Redirect if duplicate entry.
  useEffect(() => {
    if (duplicateOf) {
      Router.push(duplicateOf);
    }
  }, [duplicateOf]);

  return (
    <Fragment>
      {viewMode === ENTITY_STATUS.DEPRECATED && (
        <EntityDeprecated override={override} />
      )}
      {viewMode === ENTITY_STATUS.DUPLICATE && <div>Redirecting...</div>}
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
  if (override.duplicateOf) {
    return ENTITY_STATUS.DUPLICATE;
  }
  if (override.withdrawn) {
    return ENTITY_STATUS.WITHDRAWN;
  }
  return ENTITY_STATUS.LIVE;
}
