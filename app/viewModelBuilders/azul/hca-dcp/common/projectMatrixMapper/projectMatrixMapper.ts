import { HCA_DCP_CATEGORY_KEY } from "../../../../../../site-config/hca-dcp/category";
import { isNullOrUndefined } from "../../../../../apis/azul/common/utils";
import {
  ProjectMatrixFileResponse,
  ProjectResponseContributedAnalyses,
  ProjectResponseMatrices,
} from "../../../../../apis/azul/hca-dcp/common/entities";
import { ProjectMatrixTableView, ProjectMatrixView } from "./entities";

// Template constants
const { GENUS_SPECIES, LIBRARY_CONSTRUCTION_METHOD, ORGAN } =
  HCA_DCP_CATEGORY_KEY;
const META_REQUIRED = [GENUS_SPECIES, LIBRARY_CONSTRUCTION_METHOD, ORGAN]; // Set of meta required for display.

type ResponseMeta = Record<string, string>;
type ResponseTree =
  | ProjectResponseContributedAnalyses
  | ProjectResponseMatrices;

/**
 * A utility that maps project matrix values received from Azul in a tree format into a set of matrix file view models,
 * including their corresponding meta.
 * @param responseTree - Project response tree (either object containing key/child node structure, or array if at leaf).
 * @returns project related matrix file and corresponding meta values.
 */
export function projectMatrixMapper(
  responseTree: ResponseTree | undefined = {}
): ProjectMatrixView[] {
  return bindMatrices(responseTree);
}

/**
 * Group the project matrix views by species. If project matrix views has multiple species, they are grouped by the
 * union of all species defined for the view.
 * @param projectMatrixViews - Project matrix views.
 * @returns project matrix views by species.
 */
export function groupProjectMatrixViewsBySpecies(
  projectMatrixViews: ProjectMatrixView[]
): ProjectMatrixTableView[] {
  const viewsBySpecies = projectMatrixViews.reduce(
    (accum, projectMatrixView) => {
      const species = projectMatrixView[GENUS_SPECIES];
      const speciesKey = species.join(" ");
      if (!accum.has(speciesKey)) {
        accum.set(speciesKey, {
          projectMatrixViews: [],
          species,
        });
      }
      accum.get(speciesKey)?.projectMatrixViews.push(projectMatrixView);
      return accum;
    },
    new Map<string, ProjectMatrixTableView>()
  );
  const groupedViews = Array.from(viewsBySpecies.values());
  sortProjectMatrixTableViews(groupedViews);
  return groupedViews;
}

/**
 * Convert matrices tree structure into set of rows representing matrix files and their corresponding values.
 * @param responseTree - Project response tree (either object containing key/child node structure, or array if at leaf).
 * @returns project matrix views.
 */
function bindMatrices(responseTree: ResponseTree): ProjectMatrixView[] {
  const matrixViews = flattenResponseTree(responseTree);
  const boundViewModels = mergeDuplicatedMatrixViews(matrixViews);
  const viewModels = updateViewsMissingMeta(boundViewModels);
  sortMatrixViewsMeta(viewModels);
  sortMatrixViews(viewModels);
  return viewModels;
}

/**
 * Create a matrix view from the specified matrix file response format and the collated meta for the file.
 * @param file - Project matrix file response.
 * @param meta - Project matrix file meta.
 * @returns project matrix view.
 */
function createMatrixView(
  file: ProjectMatrixFileResponse,
  meta: ResponseMeta
): ProjectMatrixView {
  // Create matrix view, starting with core file values.
  const {
    contentDescription,
    matrixCellCount,
    name,
    size,
    url,
    uuid,
    version,
  } = file;
  const matrixView: ProjectMatrixView = {
    contentDescription,
    fileName: name,
    id: uuid,
    matrixCellCount,
    size,
    url,
    version,
  };
  // Convert meta values into arrays. There may be identical files in separate branches of the tree and we'll
  // collate and merge the meta for each duplicated file specifications into an array. It is also possible that a
  // meta value is a comma-separated value: split, trim and add as individual values.
  for (const [key, value] of Object.entries(meta)) {
    matrixView[key] = value.split(",").map((v) => v.trim());
  }
  return matrixView;
}

/**
 * Create matrix views for the specified set of matrix file response format.
 * @param files - Project matrix file response.
 * @param meta - Project matrix file meta.
 * @returns project matrix views.
 */
function createMatrixViews(
  files: ProjectMatrixFileResponse[],
  meta: ResponseMeta
): ProjectMatrixView[] {
  return files.map((file) => {
    return createMatrixView(file, meta);
  });
}

/**
 * Convert matrices tree into a row format: one row per file. Files with identical URLs but different tags are
 * represented in separate rows and must be merged/de-duped (at a later stage).
 * @param responseTree - Project response tree (either object containing key/child node structure, or array if at leaf).
 * @param meta - Set of tags associated with depth-first, postorder traversal of tree.
 * @param views - File objects flattened from depth-first, postorder, traversal of tree.
 * @returns project matrix views.
 */
export function flattenResponseTree(
  responseTree: ResponseTree,
  meta: ResponseMeta = {},
  views: ProjectMatrixView[] = []
): ProjectMatrixView[] {
  // If we've got an array, we're at the files leaf; create views for each file.
  if (Array.isArray(responseTree)) {
    views.push(...createMatrixViews(responseTree, meta));
    return views;
  }
  // Otherwise, continue traversing tree.
  for (const [key, value] of Object.entries(responseTree)) {
    if (typeof value !== "object" || value === null) {
      continue;
    }
    // Grab the key/value pair values for the current key. Add any keys as a value for the current key, branch
    // meta and repeat. For example, given { ..."libraryConstructionApproach": {"10x": { "stage": ...} } where
    // libraryConstructionApproach is the current key, we must add 10x as a value for libraryConstructionApproach
    // and continue on to the next depth level in the tree.
    for (const [nextKey, nextSubtree] of Object.entries(value)) {
      const branchedMeta = { ...meta };
      branchedMeta[key] = nextKey;
      flattenResponseTree(nextSubtree, branchedMeta, views);
    }
  }
  return views;
}

/**
 * Returns true if species, library construction approach or organ value is missing from the specified view.
 * @param view - Project matrix view.
 * @returns true if species, library construction approach or organ value is missing from the specified view.
 */
function isViewMissingMeta(view: ProjectMatrixView): boolean {
  for (let i = 0; i < META_REQUIRED.length; i++) {
    if (!view[META_REQUIRED[i]]) {
      return true;
    }
  }
  return false;
}

/**
 * Merge files that appeared more than once in the tree.
 * @param viewToMerge - Project matrix view to merge.
 * @param mergeWithView - Project matrix view to merge with.
 * @returns merged project matrix view.
 */
function mergeDuplicatedMatrixView(
  viewToMerge: ProjectMatrixView,
  mergeWithView: ProjectMatrixView
): ProjectMatrixView {
  // Create new view - for immutability - to hold merged values.
  const mergedView: ProjectMatrixView = {
    contentDescription: mergeWithView.contentDescription,
    fileName: mergeWithView.fileName,
    id: mergeWithView.id,
    matrixCellCount: mergeWithView.matrixCellCount,
    size: mergeWithView.size,
    url: mergeWithView.url,
    version: mergeWithView.version,
  };
  for (const [key, value] of Object.entries(viewToMerge)) {
    // Ignore core, non-meta, file values: these values are constant across all files and don't need to be merged.
    // That is, fileName and url. We can assume non-array values are core values.
    if (!Array.isArray(value)) {
      continue;
    }
    // Add values, if they exist, from both the view to merge with and the view that we are attempting to merge.
    const mergedMeta = new Set<string>([
      ...(mergeWithView[key] || []),
      ...(value || []),
    ]);
    mergedView[key] = Array.from(mergedMeta.values());
  }
  return mergedView;
}

/**
 * Merge files that appeared more than once in the tree.
 * @param matrixViews - Project matrix views.
 * @returns merged project matrix views.
 */
export function mergeDuplicatedMatrixViews(
  matrixViews: ProjectMatrixView[]
): ProjectMatrixView[] {
  const viewsByUrl = matrixViews.reduce((accum, matrixView) => {
    const { url } = matrixView;
    // Check if we have already added a matrix view for this file and if so, merge meta of views.
    if (accum.has(url)) {
      const mergeWith = accum.get(url) as ProjectMatrixView;
      accum.set(url, mergeDuplicatedMatrixView(matrixView, mergeWith));
    }
    // Otherwise a matrix view has not yet been added for this file, add this as the first.
    else {
      accum.set(url, matrixView);
    }
    return accum;
  }, new Map<string, ProjectMatrixView>());
  return Array.from(viewsByUrl.values());
}

/**
 * Sort matrix views by display columns: species, organ, library construction approach, file name.
 * @param matrixViews - project matrix views.
 */
export function sortMatrixViews(matrixViews: ProjectMatrixView[]): void {
  matrixViews.sort((view0, view1) => {
    // Sort by species
    const species0 = (view0[GENUS_SPECIES] || []).join("");
    const species1 = (view1[GENUS_SPECIES] || []).join("");
    if (species0 > species1) {
      return 1;
    } else if (species0 < species1) {
      return -1;
    }
    // Sort by organ
    const organ0 = (view0[ORGAN] || []).join("");
    const organ1 = (view1[ORGAN] || []).join("");
    if (organ0 > organ1) {
      return 1;
    } else if (organ0 < organ1) {
      return -1;
    }
    // Sort by library construction approach
    const lca0 = (view0[LIBRARY_CONSTRUCTION_METHOD] || []).join("");
    const lca1 = (view1[LIBRARY_CONSTRUCTION_METHOD] || []).join("");
    if (lca0 > lca1) {
      return 1;
    } else if (lca0 < lca1) {
      return -1;
    }
    return 0;
  });
}

/**
 * Sort meta values of file view model.
 * @param matrixViews - Project matrix views.
 */
export function sortMatrixViewsMeta(matrixViews: ProjectMatrixView[]): void {
  matrixViews.forEach((matrixView) => {
    Object.values(matrixView).forEach((value) => {
      if (Array.isArray(value)) {
        value.sort();
      }
    });
  });
}

/**
 * Sort matrix view groups first by species cardinality, then by species alpha.
 * @param views - Project matrix views by species.
 */
function sortProjectMatrixTableViews(views: ProjectMatrixTableView[]): void {
  views.sort((group0, group1) => {
    const speciesCount0 = group0.species.length;
    const speciesCount1 = group1.species.length;
    if (speciesCount0 > speciesCount1) {
      return 1;
    } else if (speciesCount0 < speciesCount1) {
      return -1;
    }
    return 0;
  });
}

/**
 * Correct any missing required meta (specifically species, library construction approach or organ) on the given
 * matrix view.
 * @param view - Project matrix view.
 * @returns project matrix view.
 */
function updateViewMissingMeta(view: ProjectMatrixView): ProjectMatrixView {
  const updatedView = Object.assign({}, view);
  META_REQUIRED.forEach((requiredMeta) => {
    if (isNullOrUndefined(updatedView[requiredMeta])) {
      updatedView[requiredMeta] = ["Unspecified"];
    }
  });
  return updatedView;
}

/**
 * Correct any missing required meta (specifically species, library construction approach or organ) on the given set
 * of matrix views.
 * @param views - Project matrix views.
 * @returns project matrix views.
 */
function updateViewsMissingMeta(
  views: ProjectMatrixView[]
): ProjectMatrixView[] {
  return views.map((view) => {
    if (!isViewMissingMeta(view)) {
      return view;
    }
    return updateViewMissingMeta(view);
  });
}
