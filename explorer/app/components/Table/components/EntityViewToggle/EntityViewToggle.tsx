import React, { useContext } from "react";
import {
  EntityView,
  ExploreActionKind,
  ExploreStateContext,
} from "../../../../common/context/exploreState";
import { ToggleButtonGroup } from "../../../common/ToggleButtonGroup/toggleButtonGroup";

export const EntityViewToggle = (): JSX.Element => {
  const { exploreDispatch } = useContext(ExploreStateContext);
  const toggleButtons = [
    {
      label: "Exact Match",
      onToggle: () => onChange(EntityView.EXACT),
      value: EntityView.EXACT,
    },
    {
      label: "Related Match",
      onToggle: () => onChange(EntityView.RELATED),
      value: EntityView.RELATED,
    },
  ];

  /**
   * Callback fired when toggle button value changes.
   * @param entityView - Entity list view.
   */
  const onChange = (entityView: EntityView): void => {
    exploreDispatch({
      payload: entityView,
      type: ExploreActionKind.ToggleEntityView,
    });
  };

  return <ToggleButtonGroup toggleButtons={toggleButtons} />;
};
