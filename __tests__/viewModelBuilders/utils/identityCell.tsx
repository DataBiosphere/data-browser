import type { IdentityChipProps } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/IdentityCell/components/Chips/components/Chip/types";
import { render } from "@testing-library/react";

/**
 * Returns the rendered text of each of the given IdentityCell chip labels.
 * @param chips - IdentityCell chip props.
 * @returns Chip label text, in chip order.
 */
export const getChipLabels = (chips: IdentityChipProps[] = []): string[] =>
  chips.map(({ label }) => render(<>{label}</>).container.textContent ?? "");
